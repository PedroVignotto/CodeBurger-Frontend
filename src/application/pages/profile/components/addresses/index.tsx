import { Skeleton, Address } from '@/application/pages/profile/components'
import { Address as AddressModel } from '@/domain/models'

import React from 'react'

type Props = { addresses: AddressModel[], handleDelete: (id: string) => void }

export const Addresses: React.FC<Props> = ({ addresses, handleDelete }) => {
  return (
    <>
      {addresses.length
        ? addresses.map(address => <Address address={address} key={address.id} handleDelete={handleDelete} />)
        : <Skeleton />
      }
    </>
  )
}
