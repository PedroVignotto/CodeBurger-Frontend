import { chicken } from '@/application/assets'

import { Container, Product } from './styles'

import faker from 'faker'
import React from 'react'

export const Category: React.FC = () => {
  return (
    <Container>
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
      </ul>
    </Container>
  )
}
