import { logoHeader } from '@/application/assets'
import { IconButton } from '@/application/components'
import { Cart } from '@/application/components/cart'
import { useCart } from '@/application/hooks'

import { CartCount, Container, ActiveLink } from './styles'

import { FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'

export const Header: React.FC = () => {
  const { cart } = useCart()

  const [visible, setVisible] = useState(false)
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Container visible={visible}>
        <IconButton onClick={() => setVisible(!visible)}>
          {visible ? <FiX /> : <FiMenu /> }
        </IconButton>
        <img src={logoHeader} alt="Code-burguer" />
        <nav>
          <ActiveLink to="/">Home</ActiveLink>
          <ActiveLink to="/menu">Cardápio</ActiveLink>
          <ActiveLink to="/orders">Pedidos</ActiveLink>
        </nav>
        <div>
          <Link to="#" onClick={() => setOpened(!opened)} data-testid="openCart">
            <IconButton>
              <>
                <FiShoppingCart />
                {cart.length ? <CartCount>{cart.length}</CartCount> : ''}
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

      <Cart opened={opened} setOpened={setOpened} />

    </>
  )
}
