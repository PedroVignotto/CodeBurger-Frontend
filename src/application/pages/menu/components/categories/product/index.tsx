import { DefaultButton } from '@/application/components'
import { Product as ProductModel } from '@/domain/models'

import { Container } from './styles'

import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

type Props = { product: ProductModel }

export const Product: React.FC<Props> = ({ product }) => {
  const priceFormatted = Number(product.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <>
      <Container key={product.id}>
        {product.picture && <img src={product.picture} alt={product.name} />}
        <aside>
          <div>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </div>
          <DefaultButton>
            <>
              <FiShoppingCart />
              <span>{priceFormatted}</span>
            </>
          </DefaultButton>
        </aside>
      </Container>
    </>
  )
}
