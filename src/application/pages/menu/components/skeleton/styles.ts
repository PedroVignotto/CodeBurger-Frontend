import { colors, shimmer } from '@/application/styles'

import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  + div {
    margin-top: 1rem;
  }

  div {
    margin: 0.5rem 0;
    height: 1.75rem;
    cursor: text;

    position: relative;
    overflow: hidden;
    background: no-repeat;
    background-image:
      linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight});
    background-position: left 0rem top 0rem;
    background-size: 180px;

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
  border: 1px solid ${colors.grayLight};
  height: 150px;
  cursor: pointer;

  :hover {
    -webkit-transform: scale(1.01);
    transform: scale(1.01);
    transition: 0.2s;
  }

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
`
