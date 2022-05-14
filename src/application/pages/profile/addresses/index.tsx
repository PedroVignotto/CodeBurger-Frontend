import { Container } from './styles'

import { FiEdit, FiMoreVertical, FiTrash2 } from 'react-icons/fi'
import React, { useState } from 'react'

export const Addresses: React.FC = () => {
  const [handleOpenDetails, setHandleOpenDetails] = useState(false)

  return (
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
  )
}
