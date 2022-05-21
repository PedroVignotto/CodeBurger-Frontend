import { DefaultButton } from '@/application/components'
import { main, mobile, refri, sobremesa } from '@/application/assets'
import { Default } from '@/application/layouts'

import { Container, Hero, Mobile, Banner } from './styles'

import React from 'react'

export const Home: React.FC = () => {
  return (
    <Default>
      <Container>
        <Hero>
          <div>
            <h1>A melhor hamburgueria de São Paulo</h1>
            <p>Descubra a unidade mais próxima de você e venha nos visitar!</p>
            <DefaultButton>Nossas lojas</DefaultButton>
          </div>
          <img src={main} alt="Combo" />
        </Hero>
        <Mobile>
          <img src={mobile} alt="Mobile" />
          <div>
            <h2>Codando muito e sem tempo de sair de casa?</h2>
            <h3>Chama no delivery!</h3>
            <p>Peça pelo site ou baixe nosso aplicativo que ta tudo resolvido!</p>
            <DefaultButton>Peça no aplicativo</DefaultButton>
          </div>
        </Mobile>
        <Banner>
          <img src={sobremesa} alt="Sobremesa" />
          <img src={refri} alt="Refri" />
        </Banner>
      </Container>
    </Default>
  )
}
