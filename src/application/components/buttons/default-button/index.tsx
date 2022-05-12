import React from 'react'

import { Container } from './styles'

type ButtonType = 'button' | 'submit' | 'reset' | undefined
type Props = { children: string | JSX.Element, disabled: boolean, type?: ButtonType }

export const DefaultButton: React.FC<Props> = ({ disabled, children, type }: Props) => {
  return <Container type={type} disabled={disabled}>{children}</Container>
}
