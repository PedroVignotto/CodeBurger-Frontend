import { DefaultButton } from '@/application/components/buttons'

import { Container } from './styles'

import React from 'react'

type Props = { error: string, reload: () => void }

export const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <Container>
      <span>{error}</span>
      <DefaultButton onClick={reload}>Tentar novamente</DefaultButton>
    </Container>
  )
}
