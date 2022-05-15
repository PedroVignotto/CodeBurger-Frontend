import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    padding: 2.5rem;
    width: 100%;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

      :first-child {
        flex: 1;
      }

      :last-child {
        width: 35%;
      }
    }

    button {
      margin-top: 2rem;
    }

    @media (max-width: 1250px) {
      padding: 1.25rem;
    }

    @media (max-width: 400px) {
      div {
        flex-direction: column;
        gap: 0;

        :first-child {
          width: 100%;
        }

        :last-child {
          width: 100%;
        }
      }
    }
  }
`
