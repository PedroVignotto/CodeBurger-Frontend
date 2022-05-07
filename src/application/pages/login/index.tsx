import { login, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'

import { Container, ContentWrap } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { validation: Validator }

export const Login: React.FC<Props> = ({ validation }) => {
  const [loading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    validation.validate('email', email)
  }, [email])

  useEffect(() => {
    validation.validate('password', password)
  }, [password])

  return (
    <Container>
      <aside>
        <img src={login} alt="Login" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form>
            <Input type="text" name="email" placeholder="Email" setState={setEmail} />
            <Input type="password" name="password" placeholder="Senha" setState={setPassword} />
            <button type="submit" disabled>{ loading ? <Spinner /> : 'Login' }</button>
          </form>
          <a href='#'>Não tem uma conta? <span>Crie uma!</span></a>
      </ContentWrap>
    </Container>
  )
}
