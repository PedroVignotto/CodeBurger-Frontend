import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  flex-grow: 1;
  padding: 1rem;

  h2 {
    font-weight: 700;
    font-size: 2rem;
    color: ${colors.black};
    align-self: center;
    margin: 0.5rem 0 1rem;
    letter-spacing: 1.5px;

    :after {
      content: '';
      display: block;
      height: 3px;
      width: 2rem;
      transition: 0.5s;
      background: ${colors.orange};
    }

    :hover::after {
      width: 3rem;
    }
  }
`
