import { makeLoginValidation } from '@/main/factories/application/validation'
import { makeAuthentication } from '@/main/factories/domain/use-cases/account'
import { Login } from '@/application/pages'

import React from 'react'

export const makeLogin: React.FC = () =>
  (<Login authentication={makeAuthentication()} validation={makeLoginValidation()} />)
