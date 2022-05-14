import { Addresses } from '@/application/pages/profile/addresses'
import { Skeleton } from '@/application/pages/profile/skeleton'
import { DefaultButton } from '@/application/components'
import { Default } from '@/application/layouts'

import { Container, Content } from './styles'

import { FiLogOut } from 'react-icons/fi'
import React from 'react'

export const Profile: React.FC = () => {
  return (
    <Default>
      <Container>
        <Content>
          <Addresses />
          <Skeleton />
          <footer>
            <DefaultButton><><FiLogOut />Sair</></DefaultButton>
          </footer>
        </Content>
      </Container>
    </Default>
  )
}
