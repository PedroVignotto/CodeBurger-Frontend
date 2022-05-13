import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.button`
  background-color: ${colors.orange};
  line-height: 3rem;
  color: ${colors.white};
  border-radius: 0.5rem;
  padding: 0 1rem;
  width: 60%;
  align-self: center;
  font-weight: 500;
  font-size: 1rem;
  height: 3rem;

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  &:hover {
    opacity: 0.9;
  }
`
