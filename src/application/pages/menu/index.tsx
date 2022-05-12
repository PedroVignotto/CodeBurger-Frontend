import { Footer, Header } from '@/application/components'
import { Categories } from '@/application/pages/menu/categories'
import { ListCategories } from '@/domain/use-cases/category'
import { Category } from '@/domain/models'

import { Container, Content } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { listCategories: ListCategories }

export const Menu: React.FC<Props> = ({ listCategories }: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    listCategories()
      .then(c => setCategories(c))
      .catch(e => setError(e.message))
  }, [])

  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        <button>Olá</button>
          {error
            ? <div>
                <span>{error}</span>
                <button>Tentar novamente!</button>
              </div>
            : <Categories categories={categories} />}
      </Content>

      <Footer />
    </Container>
  )
}
