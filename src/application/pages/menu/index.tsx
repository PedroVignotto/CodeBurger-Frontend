import { Footer, Header } from '@/application/components'
import { Skeleton } from '@/application/pages/menu/skeleton'
import { Category } from '@/application/pages/menu/category'

import { Container, Content } from './styles'

import React from 'react'

export const Menu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        <Category />
        <Skeleton />
      </Content>

      <Footer />
    </Container>
  )
}
