import { emptyCart } from '@/application/assets'

import { Container } from './styles'

import React from 'react'

export const Empty: React.FC = () => {
  return (
    <Container data-testid="emptyCart">
      <img src={emptyCart} alt="Carrinho vazio" />
      <span>Carrinho vazio</span>
    </Container>
  )
}
