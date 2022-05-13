import { Product } from '@/domain/models'

import { Container } from './styles'

import React from 'react'

type Props = { products: Product[] }

export const Products: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products.map(product =>
        <Container key={product.id}>
          {product.picture && <img src={product.picture} alt={product.name} />}
          <aside>
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
            </div>
            <span>{Number(product.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          </aside>
        </Container>
      )}
    </>
  )
}
