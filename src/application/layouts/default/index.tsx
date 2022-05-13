import { Footer, Header } from '@/application/components'

import { Container } from './styles'

import React from 'react'

type Props = { children: string | JSX.Element }

export const Default: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
