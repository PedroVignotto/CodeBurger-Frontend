import { Error, Footer, Header } from '@/application/components'
import { Categories } from '@/application/pages/menu/categories'
import { ListCategories } from '@/domain/use-cases/category'
import { Category } from '@/domain/models'

import { Container, Content } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { listCategories: ListCategories }

export const Menu: React.FC<Props> = ({ listCategories }: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const handleReload = (): void => {
    setCategories([])
    setError('')
    setReload(!reload)
  }

  useEffect(() => {
    listCategories()
      .then(c => setCategories(c))
      .catch(e => setError(e.message))
  }, [reload])

  return (
    <Container>
      <Header />

      <Content>
        <h2>Cardápio</h2>
        {error ? <Error error={error} reload={handleReload} /> : <Categories categories={categories} />}
      </Content>

      <Footer />
    </Container>
  )
}
