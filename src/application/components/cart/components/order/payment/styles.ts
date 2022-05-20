import { colors } from '@/application/styles'

import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.10rem 0.5rem;

    span {
      font-weight: 500;
      font-size: 1rem;
      color: ${colors.black};
    }

    strong {
      font-weight: 700;
      font-size: 1rem;
      color: ${colors.black};
    }
  }

  hr {
    width: 100%;
    border-top: 1px solid ${colors.grayLight};
    margin: 0.5rem 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 3.25rem;
    margin-top: 1rem;

    :hover {
      background-color: ${darken(0.1, colors.orange)};
    }
  }
`
