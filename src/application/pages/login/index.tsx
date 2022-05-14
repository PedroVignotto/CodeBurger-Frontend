import { login, logo } from '@/application/assets'
import { DefaultButton, Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'
import { AccountContext } from '@/application/contexts'
import { Authentication } from '@/domain/use-cases/account'

import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '@/application/layouts'

type Props = { validation: Validator, authentication: Authentication }

export const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(AccountContext)

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')

  useEffect(() => setEmailError(validation.validate('email', { email })), [email])
  useEffect(() => setPasswordError(validation.validate('password', { password })), [password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || emailError || passwordError) return

      setLoading(true)

      const account = await authentication({ email, password })

      setCurrentAccount(account)

      navigate('/')
    } catch (error: any) {
      setLoading(false)

      toast.error(error.message)
    }
  }

  return (
    <Auth>
      <>
        <aside>
          <img src={login} alt="Login" />
        </aside>
        <div>
          <img src={logo} alt="Code-burguer" />
          <form data-testid="form" onSubmit={handleSubmit}>
            <Input type="text" name="email" placeholder="Email" state={emailError} setState={setEmail} />
            <Input type="password" name="password" placeholder="Senha" state={passwordError} setState={setPassword} />
            <DefaultButton type="submit" disabled={!!emailError || !!passwordError}>{loading ? <Spinner /> : 'Entrar'}</DefaultButton>
          </form>
          <span>Não tem uma conta? <Link to="/signup">Crie uma!</Link></span>
        </div>
      </>
    </Auth>
  )
}
