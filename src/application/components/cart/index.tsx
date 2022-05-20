import { IconButton } from '@/application/components/buttons'
import { Empty, Order } from '@/application/components/cart/components'
import { useCart } from '@/application/hooks'

import { Container, Content, HeaderWrap } from './styles'

import { FiArrowRight } from 'react-icons/fi'
import React from 'react'

type Props = { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }

export const Cart: React.FC<Props> = ({ opened, setOpened }) => {
  const { cart } = useCart()

  return (
    <Container opened={opened}>
      <Content>
        <HeaderWrap>
          <IconButton onClick={() => setOpened(!opened)} data-testid="closeCart"><FiArrowRight /></IconButton>
          <h3>Você tem <span>{cart.length === 1 ? `${cart.length} item` : `${cart.length} itens`}</span> no seu carrinho</h3>
        </HeaderWrap>
        {cart.length ? <Order /> : <Empty />}
      </Content>
    </Container>
  )
}
