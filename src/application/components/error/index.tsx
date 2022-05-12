import { DefaultButton } from '@/application/components/buttons'
import React from 'react'

import { Container } from './styles'

type Props = { error: string, reload: () => void }

export const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <Container>
      <span>{error}</span>
      <DefaultButton onClick={reload}>Tentar novamente</DefaultButton>
    </Container>
  )
}
