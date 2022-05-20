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
      <DefaultButton onClick={handleCreateOrder} data-testid="addOrder">{loading ? <Spinner /> : 'Finalizar pedido'}</DefaultButton>
    </Container>
  )
}
