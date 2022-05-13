import { colors } from '@/application/styles'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

type Props = { visible: boolean }

export const Container = styled.header<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${colors.black};
  height: 4rem;
  padding: 1rem;
  border-radius: 0 0 1rem 1rem;

  > button {
    display: none;
  }

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

    > a {
      position: relative;

        + a {
        margin-left: 0.75rem;
      }
    }
  }

  @media (max-width: 720px) {
    > button {
      display: block;
      z-index: 2;
    }

    img {
      display: none;
    }

    nav {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: fixed;
      width: 100%;
      height: ${props => (props.visible ? '100%' : '0')};
      overflow: hidden;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: ${colors.black};
      transition: 0.5s;

      a {
        letter-spacing: 2px;
        font-size: 1.5rem;
        margin: 1rem 0;

        + a {
          margin-left: 0;
        }
      }
    }
  }
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
