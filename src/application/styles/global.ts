import { createGlobalStyle, keyframes } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

export const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility !important;
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  input[type="password"], input[type="email"], input[type="text"] {
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    border: none;

    :focus {
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
    }
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .modal-content {
    max-width: 600px;
    position: relative;
    border-radius: 0.25rem;
    background-color: #fff;
  }

  .modal-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    border: 0;
    background: transparent;

    svg {
      height: 1rem;
      width: 1rem;
    }
  }
`
