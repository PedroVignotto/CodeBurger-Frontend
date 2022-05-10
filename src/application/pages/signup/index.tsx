import { signup, logo } from '@/application/assets'
import { Input, Spinner } from '@/application/components'

import { Container, ContentWrap } from './styles'

import React from 'react'

export const SignUp: React.FC = () => {
  const loading = false

  return (
    <Container>
      <aside>
        <img src={signup} alt="Signup" />
      </aside>
      <ContentWrap>
          <img src={logo} alt="Code-burguer" />
          <form>
            <Input type="text" name="name" placeholder="Nome" state={''} setState={''} />
            <Input type="text" name="email" placeholder="Email" state={''} setState={''} />
            <Input type="password" name="password" placeholder="Senha" state={''} setState={''} />
            <Input type="password" name="passwordConfirmation" placeholder="Confirmar senha" state={''} setState={''} />
            <button type="submit">{ loading ? <Spinner /> : 'Cadastre-se' }</button>
          </form>
          <a href="#">Já tem uma conta? <span>Entre!</span></a>
      </ContentWrap>
    </Container>
  )
}
