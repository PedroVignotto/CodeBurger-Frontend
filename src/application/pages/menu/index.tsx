import { Footer, Header } from '@/application/components'
import { Skeleton } from '@/application/pages/menu/skeleton'

import { Container, Content } from './styles'

import React from 'react'

export const Menu: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        <Skeleton />
      </Content>

      <Footer />
    </Container>
  )
}
