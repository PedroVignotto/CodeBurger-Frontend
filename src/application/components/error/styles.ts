import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  span {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${colors.black};
  }

  button {
    width: auto;
    margin-top: 2rem;
  }
`
