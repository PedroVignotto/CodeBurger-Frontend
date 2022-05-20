import { useCart } from '@/application/hooks'

import { Container, Content, Info, Quantity } from './styles'

import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi'
import React from 'react'

export const Products: React.FC = () => {
  const { cart, updateQuantity } = useCart()

  const formatPrice = (price: number): string => Number(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <Container>
      <Content>
        {cart.map(({ quantity, product }) =>
          <section key={product.id}>
            {product.picture && <img src={product.picture} alt={product.name} />}
            <aside>
              <Info>
                <h4>{product.name}</h4>
                <span>{formatPrice(product.price)}</span>
              </Info>
              <Quantity>
                <FiMinusCircle onClick={() => updateQuantity(product.id, quantity - 1)} data-testid="decrement" />
                <span>{quantity}</span>
                <FiPlusCircle onClick={() => updateQuantity(product.id, quantity + 1)} data-testid="increment" />
              </Quantity>
            </aside>
          </section>
        )}
      </Content>
    </Container>
  )
}
