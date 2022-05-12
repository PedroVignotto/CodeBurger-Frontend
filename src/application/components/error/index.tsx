import React from 'react'

import { Container } from './styles'

type Props = { error: string, reload: () => void }

export const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <Container>
      <span>{error}</span>
      <button onClick={reload}>Tentar novamente!</button>
    </Container>
  )
}
