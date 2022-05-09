import { makeLogin } from '@/main/factories/application/pages'
import { Router } from '@/main/router'

import ReactDOM from 'react-dom'
import React from 'react'

ReactDOM.render(
  <Router
    MakeLogin={makeLogin}
  />,
  document.getElementById('root')
)
