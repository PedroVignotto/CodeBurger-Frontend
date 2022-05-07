import { login, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'

import { Container, ContentWrap } from './styles'

import React from 'react'

export const Login: React.FC = () => {
  const loading = false

  return (
    <Container>
      <aside>
        <img src={login} alt="Login" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form>
            <Input type="text" />
            <Input type="password" />
            <button type="submit">{ loading ? <Spinner /> : 'Login' }</button>
          </form>
          <a href='#'>Não tem uma conta? <span>Crie uma!</span></a>
      </ContentWrap>
    </Container>
  )
}
