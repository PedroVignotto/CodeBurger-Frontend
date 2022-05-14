import { DefaultButton } from '@/application/components'
import { Skeleton } from '@/application/pages/profile/skeleton'
import { Address } from '@/application/pages/profile/addresses/address'
import { AccountContext } from '@/application/contexts'
import { Address as AddressModel } from '@/domain/models'

import { Banner } from './styles'

import { FiPlus } from 'react-icons/fi'
import React, { useContext } from 'react'

type Props = { addresses: AddressModel[], handleDelete: (id: string) => void }

export const Addresses: React.FC<Props> = ({ addresses, handleDelete }) => {
  const { getCurrentAccount } = useContext(AccountContext)

  return (
    <>
      {addresses.length
        ? <>
            <Banner>
              <h2>Olá, {getCurrentAccount().name}</h2>
              <h3>Onde você quer receber seu pedido?</h3>
              <DefaultButton><><FiPlus />Adicionar</></DefaultButton>
            </Banner>
            {addresses.map(address => <Address address={address} key={address.id} handleDelete={handleDelete} />)}
          </>
        : <Skeleton />
      }
    </>
  )
}
