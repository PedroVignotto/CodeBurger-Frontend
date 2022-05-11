import { logoHeader } from '@/application/assets'

import { Button, CartCount, Container, Link } from './styles'

import { FiShoppingCart, FiUser } from 'react-icons/fi'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <Container>
      <img src={logoHeader} alt="Code-burguer" />
      <nav>
        <Link to="/login">Home</Link>
        <Link to="/">Cardápio</Link>
        <Link to="/signup">Pedidos</Link>
      </nav>
      <div>
        <Button>
          <FiShoppingCart />
          <CartCount>{1}</CartCount>
        </Button>
        <Button>
          <FiUser />
        </Button>
      </div>
    </Container>
  )
}
