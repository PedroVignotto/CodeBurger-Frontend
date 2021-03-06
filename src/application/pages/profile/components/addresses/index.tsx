import { Skeleton, Address } from '@/application/pages/profile/components'
import { Address as AddressModel } from '@/domain/models'

import React from 'react'

type Props = { addresses: AddressModel[] }

export const Addresses: React.FC<Props> = ({ addresses }) => {
  return (
    <>
      {addresses.length
        ? addresses.map(address => <Address address={address} key={address.id}/>)
        : <Skeleton />
      }
    </>
  )
}
