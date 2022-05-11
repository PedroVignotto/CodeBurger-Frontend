import { chicken, sorvete } from '@/application/assets'
import { Footer, Header } from '@/application/components'

import { Container, Content, Category, Product } from './styles'

import faker from 'faker'
import React from 'react'

export const Menu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        <Category>
          <h3>Lanches</h3>
          <ul>
            <Product>
              <img src={chicken} alt="" />
              <aside>
                <div>
                  <h4>{faker.commerce.productName()}</h4>
                  <p>{faker.commerce.productDescription()}</p>
                </div>
                <span>R$ {faker.datatype.float({ max: 100 })}</span>
              </aside>
            </Product>
            <Product>
              <img src={chicken} alt="" />
              <aside>
                <div>
                  <h4>{faker.commerce.productName()}</h4>
                  <p>{faker.commerce.productDescription()}</p>
                </div>
                <span>R$ {faker.datatype.float({ max: 100 })}</span>
              </aside>
            </Product>
          </ul>
        </Category>
        <Category>
          <h3>Sobremesas</h3>
          <ul>
            <Product>
              <img src={sorvete} alt="" />
              <aside>
                <div>
                  <h4>{faker.commerce.productName()}</h4>
                  <p>{faker.commerce.productDescription()}</p>
                </div>
                <span>R$ {faker.datatype.float({ max: 100 })}</span>
              </aside>
            </Product>
            <Product />
          </ul>
        </Category>
      </Content>

      <Footer />
    </Container>
  )
}
