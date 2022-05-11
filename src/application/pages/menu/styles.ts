import { colors } from '@/application/styles'

import { lighten } from 'polished'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${colors.black};
    height: 4rem;
    padding: 1rem;
    border-radius: 0 0 1rem 1rem;

    img {
      width: 250px;
      margin-bottom: 0.25rem;
    }

    nav {
      display: flex;
      align-items: center;

      a {
        letter-spacing: 1px;
        font-size: 1rem;
        font-weight: 500;
        color: ${colors.white};

        + a {
          margin-left: 2rem;
        }
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  footer {
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
  }
`

export const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  transition: 0.4s;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${colors.white}
  }

  + button {
    margin-left: 0.75rem;
  }

  :hover {
    background: ${lighten(0.1, colors.black)};
  }
`

export const CartCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -2px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: ${colors.orange};
  color: ${colors.white};
  border-radius: 100%;
  text-align: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
`

export const Link = styled(NavLink)`
  &.active {
    :after {
      content: '';
      display: block;
      height: 2px;
      width: 1rem;
      transition: 0.5s;
      background: ${colors.orange};
    }

    :hover::after {
      width: 1.5rem;
    }
  }
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
