import { Container } from './styles'

import React from 'react'

type Props = {
  children: string | JSX.Element
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const DefaultButton: React.FC<Props> = ({ disabled, children, type, onClick, ...rest }) => {
  return (
    <Container {...rest} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </Container>
  )
}
