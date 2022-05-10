import { signup, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'

import { Container, ContentWrap } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { validation: Validator }

export const SignUp: React.FC<Props> = ({ validation }) => {
  const loading = false

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState<string | undefined>('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string | undefined>('')

  useEffect(() => setNameError(validation.validate('name', name)), [name])

  useEffect(() => setEmailError(validation.validate('email', email)), [email])

  useEffect(() => setPasswordError(validation.validate('password', password)), [password])

  useEffect(() => setPasswordConfirmationError(validation.validate('passwordConfirmation', passwordConfirmation)), [passwordConfirmation])

  return (
    <Container>
      <aside>
        <img src={signup} alt="Signup" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form>
            <Input type="text" name="name" placeholder="Nome" state={nameError} setState={setName} />
            <Input type="text" name="email" placeholder="Email" state={emailError} setState={setEmail} />
            <Input type="password" name="password" placeholder="Senha" state={passwordError} setState={setPassword} />
            <Input type="password" name="passwordConfirmation" placeholder="Confirmar senha" state={passwordConfirmationError} setState={setPasswordConfirmation} />
            <button type="submit" disabled={true}>{ loading ? <Spinner /> : 'Cadastre-se' }</button>
          </form>
          <a href="#">Já tem uma conta? <span>Entre!</span></a>
      </ContentWrap>
    </Container>
  )
}
