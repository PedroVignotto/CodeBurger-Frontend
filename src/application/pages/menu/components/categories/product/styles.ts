import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  border: 1px solid ${colors.grayLight};
  padding: 1rem;
  height: 150px;
  border-radius: 2px;

  img {
    object-fit: cover;
    border-radius: 2px;
  }

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
      max-width: 60%;

      h4 {
        font-weight: 500;
        font-size: 1.25rem;
        color: ${colors.black};
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      p {
        font-weight: 400;
        font-size: 0.875rem;
        color: ${colors.grayDark};
        margin-top: 0.25rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: auto;
      align-self: flex-end;
      padding: 0.875rem;
      margin-top: -5rem;

      svg {
        height: 1.25rem;
        width: 1.25rem;
      }

      span {
        font-weight: 500;
        font-size: 0.875rem;
        color: ${colors.white};
        margin-left: 1rem;
      }

      :hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
        transition: 0.2s;
      }
    }
  }
`

export const Content = styled.section`
  display: flex;

  img {
    object-fit: cover;
    height: 100%;
    width: 50%;
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem 1rem 1rem 1rem;
    flex-grow: 1;

    div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      h4 {
        font-weight: 500;
        font-size: 1.25rem;
        color: ${colors.black};
        max-width: 80%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      p {
        font-weight: 400;
        font-size: 0.875rem;
        color: ${colors.grayDark};
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      padding: 0 2rem;

      span  {
        + span {
          margin-left: 1rem;
        }
      }
    }
  }
`
