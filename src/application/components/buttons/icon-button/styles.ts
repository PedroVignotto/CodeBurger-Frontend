import { colors } from '@/application/styles'

import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  transition: 0.4s;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${colors.white}
  }

  :hover {
    background: ${lighten(0.1, colors.black)};
  }
`
