import { makeLogin, makeMenu, makeProfile, makeRegisterAddress, makeSignUp } from '@/main/factories/application/pages'
import { Router } from '@/main/router'

import ReactDOM from 'react-dom'
import React from 'react'

ReactDOM.render(
  <Router
    Login={makeLogin}
    SignUp={makeSignUp}
    Menu={makeMenu}
    Profile={makeProfile}
    RegisterAddress={makeRegisterAddress}
  />,
  document.getElementById('root')
)
