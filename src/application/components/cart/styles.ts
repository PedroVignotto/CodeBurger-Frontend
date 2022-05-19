import { colors } from '@/application/styles'

import { darken, lighten } from 'polished'
import styled from 'styled-components'

type Props = { opened: boolean }

export const Container = styled.section<Props>`
  width: ${props => props.opened ? '375px' : '0'};
  overflow: hidden;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  transition: 0.3s;
  background: ${colors.white};
  box-shadow: 0px 2px 3px -1px ${colors.black};
  z-index: 3;

  button {
    width: 2.5rem;
    height: 2.5rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: ${colors.black};

      :hover {
        color: ${lighten(0.1, colors.black)};
      }
    }

    :hover {
      background: transparent;
    }
  }

  @media (max-width: 375px) {
    width: ${props => props.opened ? '100%' : '0'};
  }
`

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
`

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 330px;

  h3 {
    font-weight: 500;
    font-size: 1rem;
    color: ${colors.black};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 2rem;

    span {
      color: ${colors.orange}
    }
  }
`

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 1rem 0;
`

export const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  max-width: 340px;
  width: 100%;
  padding: 1rem 0;

  section {
    display: flex;
    padding: 0.5rem;

    + section {
      border-top: 1px solid ${colors.grayLight};
    }

    img {
      height: 5rem;
      width: 5rem;
      border-radius: 2px;

      @media (max-width: 375px) {
        display: none;
      }
    }

    aside {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-left: 0.5rem;
    }
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 80%;
  width: 100%;
  max-width: 180px;
  padding-right: 1rem;

  h4 {
    font-weight: 500;
    font-size: 1rem;
    color: ${colors.black};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  span {
    font-weight: 700;
    font-size: 1rem;
    color: ${colors.orange};
  }

  @media (max-width: 375px) {
    max-width: 250px;
  }
`

export const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-basis: 20%;
  width: 100%;
  max-width: 56px;

  span {
    padding: 0 0.35rem;
    color: ${colors.black};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${colors.grayDark};
    cursor: pointer;
  }
`

export const FooterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.10rem 0.5rem;

    span {
      font-weight: 500;
      font-size: 1rem;
      color: ${colors.black};
    }

    strong {
      font-weight: 700;
      font-size: 1rem;
      color: ${colors.black};
    }
  }

  hr {
    width: 100%;
    border-top: 1px solid ${colors.grayLight};
    margin: 0.5rem 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 3.25rem;
    margin-top: 1rem;

    :hover {
      background-color: ${darken(0.1, colors.orange)};
    }
  }
`
