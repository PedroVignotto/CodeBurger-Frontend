import { Container } from './styles'

import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

export const Input: React.FC<Props> = ({ state, setState, name, placeholder, ...props }: Props) => {
  return (
    <Container>
      <input
        {...props}
        title={state}
        placeholder=" "
        id={name}
        onChange={e => { setState(e.target.value) }}
      />
      <label htmlFor={name} title={state}>{placeholder}</label>
    </Container>
  )
}
