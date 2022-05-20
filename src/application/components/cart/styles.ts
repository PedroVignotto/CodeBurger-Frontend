import { colors } from '@/application/styles'

import { lighten } from 'polished'
import styled from 'styled-components'

type Props = { opened: boolean }

export const Container = styled.section<Props>`
  width: ${props => props.opened ? '375px' : '0'};
  overflow: hidden;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  transition: 0.3s;
  background: ${colors.white};
  box-shadow: 0px 2px 3px -1px ${colors.black};
  z-index: 3;

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
