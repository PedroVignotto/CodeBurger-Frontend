import { Footer, Header } from '@/application/components'
import { Skeleton } from '@/application/pages/menu/skeleton'
import { ListCategories } from '@/domain/use-cases/category'

import { Container, Content } from './styles'

import React, { useEffect } from 'react'

type Props = { listCategories: ListCategories }

export const Menu: React.FC<Props> = ({ listCategories }: Props) => {
  useEffect(() => {
    (async () => { await listCategories() })()
  }, [])

  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        <Skeleton />
      </Content>

      <Footer />
    </Container>
  )
}
