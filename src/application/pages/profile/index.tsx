import { Addresses } from '@/application/pages/profile/addresses'
import { Skeleton } from '@/application/pages/profile/skeleton'
import { DefaultButton } from '@/application/components'
import { Default } from '@/application/layouts'

import { Container, Content } from './styles'

import { FiLogOut, FiPlus } from 'react-icons/fi'
import React from 'react'

export const Profile: React.FC = () => {
  return (
    <Default>
      <Container>
        <Content>
          <header>
            <h2>Olá, any_name!</h2>
            <h3>Onde você quer receber seu pedido?</h3>
            <DefaultButton><><FiPlus />Adicionar</></DefaultButton>
          </header>
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
