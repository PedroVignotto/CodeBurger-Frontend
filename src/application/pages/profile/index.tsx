import { Error, DefaultButton } from '@/application/components'
import { Addresses } from '@/application/pages/profile/components'
import { Default } from '@/application/layouts'
import { AccountContext } from '@/application/contexts'
import { useError, useLogout } from '@/application/hooks'
import { DeleteAddress, ListAddresses } from '@/domain/use-cases/address'
import { Address } from '@/domain/models'

import { Banner, Container, Content } from './styles'

import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FiLogOut, FiPlus } from 'react-icons/fi'
import React, { useContext, useEffect, useState } from 'react'

type Props = { listAddresses: ListAddresses, deleteAddress: DeleteAddress }

export const Profile: React.FC<Props> = ({ listAddresses, deleteAddress }) => {
  const { getCurrentAccount } = useContext(AccountContext)
  const handleError = useError(error => setError(error.message))
  const logout = useLogout()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleReload = (): void => {
    setAddresses([])
    setError('')
    setReload(!reload)
  }

  const handleDelete = async (id: string): Promise<void> => {
    try {
      if (loading) return

      setLoading(true)

      await deleteAddress({ id })

      setAddresses(addresses.filter(address => address.id !== id))
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { listAddresses().then(setAddresses).catch(handleError) }, [reload])

  return (
    <Default>
      <Container>
        <Content>
          <Banner>
            <h2>Olá, {getCurrentAccount().name}</h2>
            <h3>Onde você quer receber seu pedido?</h3>
           <Link to="/address/register"><DefaultButton><><FiPlus />Adicionar</></DefaultButton></Link>
          </Banner>
          {error ? <Error error={error} reload={handleReload} /> : <Addresses addresses={addresses} handleDelete={handleDelete} />}
          <footer>
            <DefaultButton onClick={logout}><><FiLogOut />Sair</></DefaultButton>
          </footer>
        </Content>
      </Container>
    </Default>
  )
}
