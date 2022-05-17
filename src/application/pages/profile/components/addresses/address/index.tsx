import { AddressContext } from '@/application/pages/profile/contexts'
import { EditAddress } from '@/application/pages'
import { Address as AdressModel } from '@/domain/models'

import { Container } from './styles'

import { FiEdit, FiMoreVertical, FiTrash2 } from 'react-icons/fi'
import React, { useContext, useState } from 'react'

type Props = { address: AdressModel }

export const Address: React.FC<Props> = ({ address }) => {
  const { handleDelete } = useContext(AddressContext)

  const [OpenModal, setOpenModal] = useState(false)
  const [handleOpenDetails, setHandleOpenDetails] = useState(false)

  return (
    <>
      <Container details={handleOpenDetails}>
        <div>
          <div>
            <FiEdit data-testid="edit" onClick={() => setOpenModal(!OpenModal)} />
            <FiTrash2 data-testid="delete" onClick={async () => handleDelete(address.id)}/>
          </div>
          <main>
            <h3>{address.surname}</h3>
            <p>{address.street}, {address.number}{address.complement && `, ${address.complement}`}</p>
            <p>{address.district}, {address.zipCode}</p>
          </main>
        </div>
        <FiMoreVertical data-testid="details" onClick={() => setHandleOpenDetails(!handleOpenDetails)} />
      </Container>

      <EditAddress OpenModal={OpenModal} CloseModal={() => setOpenModal(!OpenModal)} address={address} setHandleOpenDetails={setHandleOpenDetails} />
    </>
  )
}
