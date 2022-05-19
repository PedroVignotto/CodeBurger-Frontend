import { DefaultButton, IconButton } from '@/application/components/buttons'
import { chicken } from '@/application/assets'

import { Container, Content, MainWrap, Info, Quantity, FooterWrap, HeaderWrap, Products } from './styles'

import { FiArrowRight, FiMinusCircle, FiPlusCircle } from 'react-icons/fi'
import React from 'react'
import faker from 'faker'

type Props = { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }

export const Cart: React.FC<Props> = ({ opened, setOpened }) => {
  return (
    <Container opened={opened}>
      <Content>
        <HeaderWrap>
          <IconButton onClick={() => setOpened(!opened)}><FiArrowRight /></IconButton>
          <h3>Você tem <span>2 itens</span> no seu carrinho</h3>
        </HeaderWrap>
        <MainWrap>
          <Products>
            <section>
              <img src={chicken} alt="" />
              <aside>
                <Info>
                  <h4>{faker.commerce.productName()}</h4>
                  <span>R$ {faker.commerce.price(9, 100)}</span>
                </Info>
                <Quantity>
                  <FiMinusCircle />
                  <span>2</span>
                  <FiPlusCircle />
                </Quantity>
              </aside>
            </section>
            <section>
              <img src={chicken} alt="" />
              <aside>
                <Info>
                  <h4>{faker.commerce.productName()}</h4>
                  <span>R$ {faker.commerce.price(9, 100)}</span>
                </Info>
                <Quantity>
                  <FiMinusCircle />
                  <span>2</span>
                  <FiPlusCircle />
                </Quantity>
              </aside>
            </section>
          </Products>
        </MainWrap>
        <FooterWrap>
          <div>
            <span>Subtotal:</span>
            <strong>R$ {faker.commerce.price(50, 200)}</strong>
          </div>
          <div>
            <span>Taxa de entrega:</span>
            <strong>R$ {faker.commerce.price(1, 5)}</strong>
          </div>
          <hr />
          <div>
            <span>Total:</span>
            <strong>R$ {faker.commerce.price(50, 200)}</strong>
          </div>
          <DefaultButton>Finalizar pedido</DefaultButton>
        </FooterWrap>
      </Content>
    </Container>
  )
}
