import { signup, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'
import { AccountContext } from '@/application/contexts'
import { AddAccount } from '@/domain/use-cases/account'

import { Container, ContentWrap } from './styles'

import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

type Props = { validation: Validator, addAccount: AddAccount }

export const SignUp: React.FC<Props> = ({ validation, addAccount }) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(AccountContext)

  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || nameError || emailError || passwordError || passwordConfirmationError) return

      setLoading(true)

      const account = await addAccount({ name, email, password })

      setCurrentAccount(account)

      navigate('/')
    } catch (error: any) {
      setLoading(false)

      toast.error(error.message)
    }
  }

  return (
    <Container>
      <aside>
        <img src={signup} alt="Signup" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form data-testid="form" onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Nome" state={nameError} setState={setName} />
            <Input type="text" name="email" placeholder="Email" state={emailError} setState={setEmail} />
            <Input type="password" name="password" placeholder="Senha" state={passwordError} setState={setPassword} />
            <Input type="password" name="passwordConfirmation" placeholder="Confirmar senha" state={passwordConfirmationError} setState={setPasswordConfirmation} />
            <button type="submit" disabled={!!nameError || !!emailError || !!passwordError || !!passwordConfirmationError}>
              { loading ? <Spinner /> : 'Cadastre-se' }
            </button>
          </form>
          <Link to="/login">Já tem uma conta? <span>Entre!</span></Link>
      </ContentWrap>
    </Container>
  )
}
