import { successOrder } from '@/application/assets'

import { Container } from './styles'

import React from 'react'

export const Success: React.FC = () => {
  return (
    <Container>
      <img src={successOrder} alt="Pedido realizado" data-testid="success" />
      <span>Seu pedido foi realizado</span>
    </Container>
  )
}
