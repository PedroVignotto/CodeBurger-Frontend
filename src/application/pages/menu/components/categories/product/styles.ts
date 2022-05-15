import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  border: 1px solid ${colors.grayLight};
  padding: 1rem;
  height: 150px;
  border-radius: 2px;
  cursor: pointer;

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
