import { background } from '@/application/assets'
import { colors } from '@/application/styles'

import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
`

export const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  div {
    h1 {
      font-weight: 500;
      font-size: 3rem;
      color: ${colors.black};
      margin: 0.5rem 0;
      letter-spacing: 1px;
    }

    p {
      font-weight: 400;
      font-size: 1.25rem;
      color: ${colors.black};
      margin: 2rem 0 1rem;
      letter-spacing: 0.5px;
      width: 75%;
    }
  }

  img {
    max-width: 700px;
    width: 100%;
    object-fit: cover;
  }
`

export const Mobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  max-height: 700px;
  width: 100%;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: fixed;
  background-size: 100%;

  img {
    height: 100%;
    width: 100%;
    max-width: 250px;
    max-height: 600px;
    object-fit: cover;
  }

  div {
    width: 50%;
    align-self: center;
    text-align: right;
    margin-top: 8rem;

    h2 {
      font-weight: 500;
      font-size: 3rem;
      color: ${colors.black};
      margin: 1rem 0;
      letter-spacing: 1px;
    }

    h3 {
      font-weight: 500;
      font-size: 2.25rem;
      color: ${colors.white};
      margin: 1rem 0;
      letter-spacing: 1px;
    }

    p {
      font-weight: 400;
      font-size: 1.25rem;
      color: ${colors.white};
      margin: 2rem 0 1rem;
      letter-spacing: 0.5px;
    }

    button {
      font-size: 1.25rem;
      margin-top: 1rem;
      background: ${colors.black};
      height: 3.25rem;

      :hover {
        background-color: ${darken(0.1, colors.black)};
      }
    }
  }
`

export const Banner = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
`
