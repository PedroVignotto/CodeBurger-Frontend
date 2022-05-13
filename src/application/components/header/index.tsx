import { logoHeader } from '@/application/assets'
import { IconButton } from '@/application/components'

import { CartCount, Container, Link } from './styles'

import { FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi'
import React, { useState } from 'react'

export const Header: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const handleTogleVisible = (): void => {
    setVisible(!visible)
  }

  return (
    <Container visible={visible}>
      <IconButton onClick={handleTogleVisible}>
        {visible ? <FiX /> : <FiMenu /> }
      </IconButton>
      <img src={logoHeader} alt="Code-burguer" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Cardápio</Link>
        <Link to="/orders">Pedidos</Link>
      </nav>
      <div>
        <Link to="/cart">
          <IconButton>
            <>
              <FiShoppingCart />
              <CartCount>{1}</CartCount>
            </>
          </IconButton>
        </Link>
        <Link to="/profile">
          <IconButton>
            <FiUser />
          </IconButton>
        </Link>
      </div>
    </Container>
  )
}
