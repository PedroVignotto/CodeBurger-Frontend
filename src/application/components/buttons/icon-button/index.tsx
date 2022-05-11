import React from 'react'

import { Container } from './styles'

type Props = { children: string | JSX.Element }

export const IconButton: React.FC<Props> = ({ children }: Props) => {
  return <Container>{children}</Container>
}
