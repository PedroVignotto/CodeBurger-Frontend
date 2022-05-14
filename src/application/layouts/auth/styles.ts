import { colors } from '@/application/styles'

import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;

  aside {
    background: ${colors.black};
    width: 60%;

    img {
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 1250px) {
      display: none;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 850px;

    @media (max-width: 1250px) {
      width: 100%;
    }

    img {
      width: 600px;
      height: 150px;

      @media (max-width: 720px) {
        width: 500px;
        height: 125px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      padding: 2.5rem;
      width: 100%;
      max-width: 550px;

      button {
        margin-top: 2rem;
      }

      @media (max-width: 1250px) {
        padding: 1.25rem;
      }
    }

    span {
      color: ${colors.black};
      font-weight: 400;
      font-size: 1rem;
      display: block;
      transition: color 0.3s;
      align-self: center;

      a {
        color: ${colors.orange};
        font-weight: 700;

        :hover {
          color: ${darken(0.1, colors.orange)};
        }
      }
    }
  }
`
