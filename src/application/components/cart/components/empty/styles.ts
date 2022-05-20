import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  img {
    width: 100px;
    height: 100px;
  }

  span {
    font-weight: 700;
    font-size: 1.25rem;
    margin: 1rem 0 0 1.5rem;
    color: ${colors.orange};
  }
`
