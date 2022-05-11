import React from 'react'

import { Container } from './styles'

type Props = { children: string | JSX.Element, disabled: boolean }

export const SubmitButton: React.FC<Props> = ({ disabled, children }: Props) => {
  return <Container type="submit" disabled={disabled}>{children}</Container>
}
