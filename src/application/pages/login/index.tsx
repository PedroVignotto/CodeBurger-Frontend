import { login, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'
import { Authentication } from '@/domain/use-cases/account'

import { Container, ContentWrap } from './styles'

import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'

type Props = { validation: Validator, authentication: Authentication }

export const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => setEmailError(validation.validate('email', email)), [email])

  useEffect(() => setPasswordError(validation.validate('password', password)), [password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || emailError || passwordError) return

      setLoading(true)

      const account = await authentication({ email, password })

      localStorage.setItem('account', JSON.stringify(account))
    } catch (error: any) {
      setLoading(false)

      toast.error(error.message)
    }
  }

  return (
    <Container>
      <aside>
        <img src={login} alt="Login" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form data-testid="form" onSubmit={handleSubmit}>
            <Input type="text" name="email" placeholder="Email" state={emailError} setState={setEmail} />
            <Input type="password" name="password" placeholder="Senha" state={passwordError} setState={setPassword} />
            <button type="submit" disabled={!!emailError || !!passwordError}>{ loading ? <Spinner /> : 'Login' }</button>
          </form>
          <a href='#'>Não tem uma conta? <span>Crie uma!</span></a>
      </ContentWrap>
    </Container>
  )
}
