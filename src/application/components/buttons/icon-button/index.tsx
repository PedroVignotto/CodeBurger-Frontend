import React from 'react'

import { Container } from './styles'

type Props = { children: string | JSX.Element, onClick?: React.MouseEventHandler<HTMLButtonElement> }

export const IconButton: React.FC<Props> = ({ children, onClick }: Props) => {
  return <Container onClick={onClick}>{children}</Container>
}
