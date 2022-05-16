import { makeLoginValidation } from '@/main/factories/application/validation'
import { makeAddAddress, makeSearchAddress } from '@/main/factories/domain/use-cases/address'
import { RegisterAddress } from '@/application/pages'

import React from 'react'

export const makeRegisterAddress: React.FC = () =>
  (<RegisterAddress validation={makeLoginValidation()} searchAddress={makeSearchAddress()} addAddress={makeAddAddress()} />)
