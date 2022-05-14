import { colors } from '@/application/styles'

import styled from 'styled-components'

type Props = { details: boolean }

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

export const Container = styled.section<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid ${colors.grayLight};
  box-shadow: 0px 4px 6px -4px ${colors.grayLight};

  + section {
    margin-top: 1.25rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${colors.grayDark};
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-around;


      svg {
        width: ${props => props.details ? '1.50rem' : '0'};
        height: ${props => props.details ? '1.50rem' : '0'};
        color: ${colors.orange};
        transition: 0.5s;

        + svg {
          margin: ${props => props.details ? '0 0.75rem' : '0'};
          align-self: flex-end !important;
        }
      }
    }

    main {
      h3 {
        font-weight: 500;
        font-size: 1.25rem;
        color: ${colors.black};
        letter-spacing: 1px;
        margin-bottom: 0.25rem;
      }

      p {
        font-weight: 400;
        font-size: 0.875rem;
        color: ${colors.grayDark};
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
      }
    }
  }
`
