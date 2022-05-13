import { Error, Footer, Header } from '@/application/components'
import { Categories } from '@/application/pages/menu/categories'
import { useError } from '@/application/hooks'
import { ListCategories } from '@/domain/use-cases/category'
import { Category } from '@/domain/models'

import { Container, Content } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { listCategories: ListCategories }

export const Menu: React.FC<Props> = ({ listCategories }: Props) => {
  const handleError = useError(error => setError(error.message))

  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const handleReload = (): void => {
    setCategories([])
    setError('')
    setReload(!reload)
  }

  useEffect(() => { listCategories().then(setCategories).catch(handleError) }, [reload])

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
