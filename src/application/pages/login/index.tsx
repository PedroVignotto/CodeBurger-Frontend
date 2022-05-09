import { login, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'
import { Authentication } from '@/domain/use-cases/account'

import { Container, ContentWrap } from './styles'

import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

type Props = { validation: Validator, authentication: Authentication }

export const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    const error = validation.validate('email', email)
    if (error) setEmailError(error)
  }, [email])

  useEffect(() => {
    const error = validation.validate('password', password)
    if (error) setPasswordError(error)
  }, [password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || emailError || passwordError) return

      setLoading(true)

      const account = await authentication({ email, password })

      localStorage.setItem('account', JSON.stringify(account))

      navigate('/')
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
          <Link to="signup">Não tem uma conta? <span>Crie uma!</span></Link>
      </ContentWrap>
    </Container>
  )
}
