import { DefaultButton } from '@/application/components'
import { Skeleton } from '@/application/pages/profile/skeleton'

import { Container, Banner } from './styles'

import { FiEdit, FiMoreVertical, FiPlus, FiTrash2 } from 'react-icons/fi'
import React, { useState } from 'react'

export const Addresses: React.FC = () => {
  const loading = true
  const [handleOpenDetails, setHandleOpenDetails] = useState(false)

  return (
    <>
    {loading
      ? <Skeleton />
      : <>
      <Banner>
        <h2>Olá, any_name!</h2>
        <h3>Onde você quer receber seu pedido?</h3>
        <DefaultButton><><FiPlus />Adicionar</></DefaultButton>
      </Banner>
      <Container details={handleOpenDetails}>
        <div>
          <div>
            <FiEdit />
            <FiTrash2 />
          </div>
          <main>
            <h3>any_surname</h3>
            <p>any_street, any_number, any_complement</p>
            <p>any_district, any_zipcode</p>
          </main>
        </div>
        <FiMoreVertical onClick={() => setHandleOpenDetails(!handleOpenDetails)} />
      </Container>
    </>
    }

    </>
  )
}
