import { Error, DefaultButton } from '@/application/components'
import { Addresses } from '@/application/pages/profile/addresses'
import { Default } from '@/application/layouts'
import { useError, useLogout } from '@/application/hooks'
import { DeleteAddress, ListAddresses } from '@/domain/use-cases/address'
import { Address } from '@/domain/models'

import { Container, Content } from './styles'

import { FiLogOut } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'

type Props = { listAddresses: ListAddresses, deleteAddress: DeleteAddress }

export const Profile: React.FC<Props> = ({ listAddresses, deleteAddress }) => {
  const handleError = useError(error => setError(error.message))
  const logout = useLogout()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const handleReload = (): void => {
    setAddresses([])
    setError('')
    setReload(!reload)
  }

  const handleDelete = async (id: string): Promise<void> => {
    await deleteAddress({ id })

    setAddresses(addresses.filter(address => address.id !== id))
  }

  useEffect(() => { listAddresses().then(setAddresses).catch(handleError) }, [reload])

  return (
    <Default>
      <Container>
        <Content>
          {error ? <Error error={error} reload={handleReload} /> : <Addresses addresses={addresses} handleDelete={handleDelete} />}
          <footer>
            <DefaultButton onClick={logout}><><FiLogOut />Sair</></DefaultButton>
          </footer>
        </Content>
      </Container>
    </Default>
  )
}
