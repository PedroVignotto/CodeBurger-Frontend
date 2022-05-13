import React from 'react'

import { Container } from './styles'

type ButtonType = 'button' | 'submit' | 'reset' | undefined
type Props = {
  children: string | JSX.Element
  disabled?: boolean
  type?: ButtonType
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const DefaultButton: React.FC<Props> = ({ disabled, children, type, onClick }) => {
  return (
    <Container type={type} disabled={disabled} onClick={onClick}>
      {children}
    </Container>
  )
}
