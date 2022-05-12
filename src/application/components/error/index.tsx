import React from 'react'

import { Container } from './styles'

type Props = { error: string }

export const Error: React.FC<Props> = ({ error }: Props) => {
  return (
    <Container>
      <span>{error}</span>
      <button>Tentar novamente!</button>
    </Container>
  )
}
