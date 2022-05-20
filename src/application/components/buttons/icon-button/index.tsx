import { Container } from './styles'

import React from 'react'

type Props = { children: string | JSX.Element, onClick?: React.MouseEventHandler<HTMLButtonElement> }

export const IconButton: React.FC<Props> = ({ children, onClick, ...rest }) => {
  return <Container {...rest} onClick={onClick}>{children}</Container>
}
