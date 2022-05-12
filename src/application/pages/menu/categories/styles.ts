import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.div`
  + div {
    margin-top: 1rem;
  }

  h3 {
    font-weight: 500;
    font-size: 1.75rem;
    color: ${colors.black};
    margin: 0.5rem 0;
    letter-spacing: 1px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: 870px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`
