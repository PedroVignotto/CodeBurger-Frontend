import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  padding: 1rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.5rem;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    margin-top: 1.25rem;
  }
`

export const Banner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-weight: 500;
    font-size: 2rem;
    color: ${colors.black};
    align-self: center;
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

  h3 {
    font-weight: 500;
    font-size: 1.5rem;
    color: ${colors.black};
    margin: 0.5rem 0;
    letter-spacing: 1px;
    align-self: center;
  }

  button {
    align-self: flex-end;
    height: 2.35rem;
    width: auto;
    margin: 3rem 0 0.5rem 0;

    svg {
      margin-right: 0.5rem;
    }
  }
`
