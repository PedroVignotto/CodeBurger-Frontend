import { logoHeader, chicken, sorvete } from '@/application/assets'

import { Button, Container, CartCount, Link, Content, Category, Product } from './styles'

import { FiInstagram, FiShoppingCart, FiTwitter, FiUser, FiYoutube } from 'react-icons/fi'
import faker from 'faker'
import React from 'react'

export const Menu: React.FC = () => {
  return (
    <Container>
      <header>
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
          <Button><FiUser /></Button>
        </div>
      </header>

      <Content>
        <h2>Cardápio</h2>
        <Category>
          <h3>Lanches</h3>
          <ul>
            <Product>
              <img src={chicken} alt="" />
              <aside>
                <div>
                  <h4>{faker.commerce.productName()}</h4>
                  <p>{faker.commerce.productDescription()}</p>
                </div>
                <span>R$ {faker.datatype.float({ max: 100 })}</span>
              </aside>
            </Product>
            <Product>
              <img src={chicken} alt="" />
              <aside>
                <div>
                  <h4>{faker.commerce.productName()}</h4>
                  <p>{faker.commerce.productDescription()}</p>
                </div>
                <span>R$ {faker.datatype.float({ max: 100 })}</span>
              </aside>
            </Product>
          </ul>
        </Category>
        <Category>
          <h3>Sobremesas</h3>
          <ul>
            <Product>
              <img src={sorvete} alt="" />
              <aside>
                <div>
                  <h4>{faker.commerce.productName()}</h4>
                  <p>{faker.commerce.productDescription()}</p>
                </div>
                <span>R$ {faker.datatype.float({ max: 100 })}</span>
              </aside>
            </Product>
          </ul>
        </Category>
      </Content>

      <footer>
        <span>© 2022 Code Burger</span>
        <div>
          <Button><FiInstagram /></Button>
          <Button><FiTwitter /></Button>
          <Button><FiYoutube /></Button>
        </div>
      </footer>
    </Container>
  )
}
