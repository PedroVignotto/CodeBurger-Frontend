import { DefaultButton, IconButton } from '@/application/components/buttons'
import { useCart } from '@/application/hooks'

import { Container, Content, MainWrap, Info, Quantity, FooterWrap, HeaderWrap, Products } from './styles'

import { FiArrowRight, FiMinusCircle, FiPlusCircle } from 'react-icons/fi'
import React from 'react'

type Props = { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }

export const Cart: React.FC<Props> = ({ opened, setOpened }) => {
  const { cart, updateQuantity } = useCart()
  const subtotal = cart.reduce((total, { quantity, product }) => total + product.price * quantity, 0)
  const deliveryFee = 5
  const total = subtotal + deliveryFee

  const formatPrice = (price: number): string => Number(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <Container opened={opened}>
      <Content>
        <HeaderWrap>
          <IconButton onClick={() => setOpened(!opened)} data-testid="closeCart"><FiArrowRight /></IconButton>
          <h3>Você tem <span>{cart.length === 1 ? `${cart.length} item` : `${cart.length} itens`} </span> no seu carrinho</h3>
        </HeaderWrap>
        {cart.length
          ? <>
          <MainWrap>
            <Products>
              {cart.map(({ quantity, product }) =>
                <section key={product.id}>
                  {product.picture && <img src={product.picture} alt={product.name} />}
                  <aside>
                    <Info>
                      <h4>{product.name}</h4>
                      <span>{formatPrice(product.price)}</span>
                    </Info>
                    <Quantity>
                      <FiMinusCircle onClick={() => updateQuantity(product.id, quantity - 1)} data-testid="decrement" />
                      <span>{quantity}</span>
                      <FiPlusCircle onClick={() => updateQuantity(product.id, quantity + 1)} data-testid="increment" />
                    </Quantity>
                  </aside>
                </section>
              )}
            </Products>
          </MainWrap>
          <FooterWrap>
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
            <DefaultButton>Finalizar pedido</DefaultButton>
          </FooterWrap>
        </>
          : <div data-testid="emptyCart">Carrinho vazio</div>
        }

      </Content>
    </Container>
  )
}
