import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  padding: 1rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.5rem;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    margin-top: 1.25rem;
  }
`
