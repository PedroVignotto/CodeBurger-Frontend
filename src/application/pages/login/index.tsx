import { login, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'

import { Container, ContentWrap } from './styles'

import React, { useState } from 'react'

export const Login: React.FC = () => {
  const [loading] = useState(false)

  return (
    <Container>
      <aside>
        <img src={login} alt="Login" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form>
            <Input type="text" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <button type="submit" disabled>{ loading ? <Spinner /> : 'Login' }</button>
          </form>
          <a href='#'>Não tem uma conta? <span>Crie uma!</span></a>
      </ContentWrap>
    </Container>
  )
}
