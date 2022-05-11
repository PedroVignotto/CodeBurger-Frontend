import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: ${colors.black};
  height: 4rem;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;

  img {
    width: 250px;
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${colors.white};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    button  {
      + button {
        margin-left: 0.25rem;
      }
    }
  }
`
