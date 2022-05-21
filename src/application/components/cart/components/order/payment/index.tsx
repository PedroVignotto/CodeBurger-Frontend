import { Spinner } from '@/application/components'
import { DefaultButton } from '@/application/components/buttons'
import { useCart } from '@/application/hooks'
import { formatPrice } from '@/application/utils'

import { Container } from './styles'

import React from 'react'

type Props = { loading: boolean, handleCreateOrder: () => Promise<void> }

export const Payment: React.FC<Props> = ({ loading, handleCreateOrder }) => {
  const { cart } = useCart()

  const subtotal = cart.reduce((total, { quantity, product }) => total + product.price * quantity, 0)
  const deliveryFee = 5
  const total = subtotal + deliveryFee

  return (
    <Container>
      <section>
        <span>Subtotal:</span>
        <strong>{formatPrice(subtotal)}</strong>
      </section>
      <section>
        <span>Taxa de entrega:</span>
        <strong>{formatPrice(deliveryFee)}</strong>
      </section>
      <hr />
      <section>
        <span>Total:</span>
        <strong>{formatPrice(total)}</strong>
      </section>
      <DefaultButton onClick={handleCreateOrder} data-testid="addOrder">{loading ? <Spinner /> : 'Finalizar pedido'}</DefaultButton>
    </Container>
  )
}
