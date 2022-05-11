import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  flex-grow: 1;
  padding: 1rem;

  img {
    object-fit: cover;
    border-radius: 2px;
  }

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

export const Category = styled.section`
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
  }

  + section {
    margin-top: 1rem;
  }
`

export const Product = styled.li`
  display: flex;
  border: 1px solid ${colors.grayLight};
  padding: 1rem;
  height: 150px;
  border-radius: 2px;
  cursor: pointer;

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
    flex-grow: 1;

    div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      h4 {
        font-weight: 500;
        font-size: 1.25rem;
        color: ${colors.black};
      }

      p {
        font-weight: 400;
        font-size: 0.875rem;
        color: ${colors.grayDark};
      }
    }

    span {
      font-weight: 700;
      font-size: 1.25rem;
      color: ${colors.black};
      align-self: flex-end;
    }
  }

  :hover {
    -webkit-transform: scale(1.01);
    transform: scale(1.01);
    transition: 0.2s;
  }
`
