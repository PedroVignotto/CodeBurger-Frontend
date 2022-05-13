import { logoHeader } from '@/application/assets'
import { IconButton } from '@/application/components'

import { CartCount, Container, ActiveLink } from './styles'

import { FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
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
        <ActiveLink to="/">Home</ActiveLink>
        <ActiveLink to="/menu">Cardápio</ActiveLink>
        <ActiveLink to="/orders">Pedidos</ActiveLink>
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
