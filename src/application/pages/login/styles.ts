import { colors } from '@/application/styles'

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
`

export const ContentWrap = styled.div`
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

  a {
    color: ${colors.black};
    font-weight: 400;
    font-size: 1rem;
    display: block;
    transition: color 0.3s;
    align-self: center;

    &:hover {
      opacity: 0.9;
    }

    span {
      color: ${colors.orange};
      font-weight: 700;
    }
  }
`
