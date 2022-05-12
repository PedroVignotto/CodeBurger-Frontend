import { colors } from '@/application/styles'

import { lighten } from 'polished'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`

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

export const Category = styled.div`
  + div {
    margin-top: 1rem;
  }

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

    @media (max-width: 870px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

export const Product = styled.li`
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

  &:empty {
    position: relative;
    overflow: hidden;
    background: no-repeat;
    background-image:
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight});
    background-position:
      left 1rem top 1rem,
      right 1rem bottom 1rem,
      left 146px top 1rem,
      left 146px top 2.5rem,
      left 146px top 3.5rem,
      left 146px top 4.5rem;
    background-size:
      112px 116px,
      80px 1.25rem,
      40% 1.25rem,
      60% 0.875rem,
      65% 0.875rem,
      30% 0.875rem;

    :after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      background-image:
        linear-gradient(to right, transparent, ${lighten(0.05, colors.white)}, transparent);
      animation: ${shimmer} 1s infinite;
    }
  }
`
