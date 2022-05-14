import { colors, shimmer } from '@/application/styles'
import { lighten } from 'polished'

import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid ${colors.grayLight};
  box-shadow: 0px 4px 6px -4px ${colors.grayLight};
  height: 87.75px;

  + section {
    margin-top: 1.25rem;
  }

  position: relative;
  overflow: hidden;
  background: no-repeat;
  background-image:
    linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
    linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
    linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight}),
    linear-gradient(to right, ${colors.grayLight}, ${colors.grayLight});
  background-position:
    left 1rem top 0.5rem,
    left 1rem top 2.50rem,
    left 1rem top 3.50rem,
    right 1.25rem top 1.75rem;
  background-size:
    15% 1.25rem,
    35% 0.875rem,
    25% 0.875rem,
    0.75rem 2rem;

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
