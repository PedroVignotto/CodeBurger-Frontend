import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 2rem;
  position: relative;
  border-bottom: 1px solid ${colors.black};

  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${colors.black};
    position: absolute;
    bottom: -2px;
    left: 0px;
    transform-origin: 0%;
    transform: scaleX(0);
    transition: transform 400ms ease;
  }

  &:focus-within {
    border-color: transparent;

    &::after {
      transform: scaleX(1);
    }

    label {
      transform: scale(0.9) translateY(-1.25rem);
    }
  }

  input {
    width: 100%;
    line-height: 1.5rem;
    padding: 0 0.5rem;

    &:not(:placeholder-shown) + label {
      transform: scale(0.9) translateY(-20px);
    }
  }

  label {
    position: absolute;
    left: 0.5rem;
    color: ${colors.grayDark};
    transform-origin: 0%;
    transform: translateY(0px);
    transition: transform 400ms ease;
    pointer-events: none;
    cursor: text;
  }
`
