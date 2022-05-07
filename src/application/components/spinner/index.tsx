import { Container } from './styles'

import { FiRotateCw } from 'react-icons/fi'
import React from 'react'

export const Spinner: React.FC = () => {
  return (
    <Container>
      <FiRotateCw />
    </Container>
  )
}
