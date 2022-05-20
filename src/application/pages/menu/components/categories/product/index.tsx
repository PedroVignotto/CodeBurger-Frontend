import { DefaultButton } from '@/application/components'
import { useCart } from '@/application/hooks'
import { formatPrice } from '@/application/utils'
import { Product as ProductModel } from '@/domain/models'

import { Container } from './styles'

import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

type Props = { product: ProductModel }

export const Product: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <>
      <Container key={product.id}>
        {product.picture && <img src={product.picture} alt={product.name} />}
        <aside>
          <div>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </div>
          <DefaultButton data-testid="addToCartButton" onClick={() => addToCart(product)}>
            <>
              <FiShoppingCart />
              <span>{formatPrice(product.price)}</span>
            </>
          </DefaultButton>
        </aside>
      </Container>
    </>
  )
}
