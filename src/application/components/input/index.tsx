import { Container } from './styles'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  setState?: any
}

export const Input: React.FC<Props> = ({ setState, name, placeholder, ...props }: Props) => {
  return (
    <Container>
      <input
        {...props}
        placeholder=" "
        id={name}
        onChange={e => { setState(e.target.value) }}
      />
      <label htmlFor={name}>{placeholder}</label>
    </Container>
  )
}
