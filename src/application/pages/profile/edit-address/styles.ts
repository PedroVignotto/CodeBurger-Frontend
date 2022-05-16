import { colors } from '@/application/styles'

import styled from 'styled-components'

export const Content = styled.section`
  padding: 1rem;

  span {
    font-weight: 500;
    font-size: 1rem;
    color: ${colors.black};
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

      div {
        :first-child {
          flex: 1;
        }

        :last-child {
          width: 35%;
        }
      }
    }

    button {
      margin-top: 2rem;
    }
  }

  @media (max-width: 400px) {
    form {
      section {
        flex-direction: column;
        gap: 0;

        div {
          :first-child {
            width: 100%;
          }

          :last-child {
            width: 100% !important;
          }
        }
      }
    }
  }
`
