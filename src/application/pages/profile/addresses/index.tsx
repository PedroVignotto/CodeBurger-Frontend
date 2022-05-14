import { DefaultButton } from '@/application/components'
import { Skeleton } from '@/application/pages/profile/skeleton'
import { Address } from '@/domain/models'

import { Container, Banner } from './styles'

import { FiEdit, FiMoreVertical, FiPlus, FiTrash2 } from 'react-icons/fi'
import React, { useState } from 'react'

type Props = { addresses: Address[] }

export const Addresses: React.FC<Props> = ({ addresses }) => {
  const [handleOpenDetails, setHandleOpenDetails] = useState(false)

  return (
    <>
    {addresses.length
      ? <>
          <Banner>
            <h2>Olá, any_name!</h2>
            <h3>Onde você quer receber seu pedido?</h3>
            <DefaultButton><><FiPlus />Adicionar</></DefaultButton>
          </Banner>
          {addresses.map(address =>
            <Container details={handleOpenDetails} key={address.id}>
              <div>
                <div>
                  <FiEdit />
                  <FiTrash2 />
                </div>
                <main>
                  <h3>{address.surname}</h3>
                  <p>{address.street}, {address.number}{address.complement && `, ${address.complement}`}</p>
                  <p>{address.district}, {address.zipCode}</p>
                </main>
              </div>
              <FiMoreVertical onClick={() => setHandleOpenDetails(!handleOpenDetails)} />
            </Container>
          )}
        </>
      : <Skeleton />
    }
    </>
  )
}
