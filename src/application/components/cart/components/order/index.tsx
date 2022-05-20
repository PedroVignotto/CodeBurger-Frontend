import { DefaultButton } from '@/application/components/buttons'
import { useCart } from '@/application/hooks'

import { MainWrap, Info, Quantity, FooterWrap, Products } from './styles'

import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi'

import React from 'react'

export const Order: React.FC = () => {
  const { cart, updateQuantity } = useCart()

  const subtotal = cart.reduce((total, { quantity, product }) => total + product.price * quantity, 0)
  const deliveryFee = 5
  const total = subtotal + deliveryFee

  const formatPrice = (price: number): string => Number(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <>
      <MainWrap>
        <Products>
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
        </Products>
      </MainWrap>
      <FooterWrap>
        <div>
          <span>Subtotal:</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div>
          <span>Taxa de entrega:</span>
          <strong>{formatPrice(deliveryFee)}</strong>
        </div>
        <hr />
        <div>
          <span>Total:</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <DefaultButton>Finalizar pedido</DefaultButton>
      </FooterWrap>
    </>
  )
}
