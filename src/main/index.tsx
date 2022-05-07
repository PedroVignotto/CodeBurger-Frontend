import { GlobalStyle } from '@/application/styles'
import { Login } from '@/application/pages'

import ReactDOM from 'react-dom'
import React from 'react'

ReactDOM.render(
  <>
    <GlobalStyle />
    <Login />
  </>,
  document.getElementById('root')
)
