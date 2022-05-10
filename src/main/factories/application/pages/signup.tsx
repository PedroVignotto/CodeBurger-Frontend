import { makeSignUpValidation } from '@/main/factories/application/validation'
import { makeAddAccount } from '@/main/factories/domain/use-cases/account'
import { SignUp } from '@/application/pages'

import React from 'react'

export const makeSignUp: React.FC = () =>
  (<SignUp addAccount={makeAddAccount()} validation={makeSignUpValidation()} />)
