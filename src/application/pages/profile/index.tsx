import { Addresses } from '@/application/pages/profile/addresses'
import { DefaultButton } from '@/application/components'
import { Default } from '@/application/layouts'
import { ListAddresses } from '@/domain/use-cases/address'
import { Address } from '@/domain/models'

import { Container, Content } from './styles'

import { FiLogOut } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'

type Props = { listAddresses: ListAddresses }

export const Profile: React.FC<Props> = ({ listAddresses }) => {
  const [addresses, setAddresses] = useState<Address[]>([])

  useEffect(() => { listAddresses().then(setAddresses) }, [])

  return (
    <Default>
      <Container>
        <Content>
          <Addresses addresses={addresses} />
          <footer>
            <DefaultButton><><FiLogOut />Sair</></DefaultButton>
          </footer>
        </Content>
      </Container>
    </Default>
  )
}
