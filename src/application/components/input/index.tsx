import { Container } from './styles'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = ({ placeholder, ...props }: Props) => {
  return (
    <Container>
      <input {...props} placeholder=" " />
      <label>{placeholder}</label>
    </Container>
  )
}
