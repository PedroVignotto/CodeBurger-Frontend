import { makeDeleteAddress, makeListAddresses } from '@/main/factories/domain/use-cases/address'
import { Profile } from '@/application/pages'

import React from 'react'

export const makeProfile: React.FC = () =>
  (<Profile listAddresses={makeListAddresses()} deleteAddress={makeDeleteAddress()} />)
