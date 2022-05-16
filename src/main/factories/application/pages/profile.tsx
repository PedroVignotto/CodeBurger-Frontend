import { makeDeleteAddress, makeListAddresses, makeUpdateAddress } from '@/main/factories/domain/use-cases/address'
import { makeEditAddressValidation } from '@/main/factories/application/validation'
import { Profile } from '@/application/pages'

import React from 'react'

export const makeProfile: React.FC = () =>
  (<Profile
    listAddresses={makeListAddresses()}
    deleteAddress={makeDeleteAddress()}
    validation={makeEditAddressValidation()}
    updateAddress={makeUpdateAddress()}
  />)
