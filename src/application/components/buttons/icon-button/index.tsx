import { Container } from './styles'

import React from 'react'

type Props = { children: string | JSX.Element, onClick?: React.MouseEventHandler<HTMLButtonElement> }

export const IconButton: React.FC<Props> = ({ children, onClick }) => {
  return <Container onClick={onClick}>{children}</Container>
}
