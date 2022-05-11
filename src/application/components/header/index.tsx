import { logoHeader } from '@/application/assets'
import { IconButton } from '@/application/components'

import { CartCount, Container, Link } from './styles'

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
        <IconButton>
          <>
            <FiShoppingCart />
            <CartCount>{1}</CartCount>
          </>
        </IconButton>
        <IconButton>
          <FiUser />
        </IconButton>
      </div>
    </Container>
  )
}
