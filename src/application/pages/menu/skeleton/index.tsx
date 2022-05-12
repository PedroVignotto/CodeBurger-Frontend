import { Container, Product } from './styles'

import React from 'react'

export const Skeleton: React.FC = () => {
  return (
    <>
      <Container>
        <div />
        <ul>
          <Product />
          <Product />
          <Product />
        </ul>
      </Container>
      <Container>
        <div />
        <ul>
          <Product />
          <Product />
          <Product />
          <Product />
        </ul>
      </Container>
    </>
  )
}
