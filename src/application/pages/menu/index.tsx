import { Footer, Header } from '@/application/components'
import { Categories } from '@/application/pages/menu/categories'
import { ListCategories } from '@/domain/use-cases/category'
import { Category } from '@/domain/models'

import { Container, Content } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { listCategories: ListCategories }

export const Menu: React.FC<Props> = ({ listCategories }: Props) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    listCategories().then(c => setCategories(c))
  }, [])

  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        <Categories categories={categories} />
      </Content>

      <Footer />
    </Container>
  )
}
