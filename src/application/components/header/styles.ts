import { colors } from '@/application/styles'

import { lighten } from 'polished'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.header`
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
