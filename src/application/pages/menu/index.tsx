import { Error, Footer, Header } from '@/application/components'
import { Categories } from '@/application/pages/menu/categories'
import { AccountContext } from '@/application/contexts'
import { ListCategories } from '@/domain/use-cases/category'
import { Category } from '@/domain/models'
import { UnauthorizedError } from '@/domain/errors'

import { Container, Content } from './styles'

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = { listCategories: ListCategories }

export const Menu: React.FC<Props> = ({ listCategories }: Props) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(AccountContext)

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
      .catch(e => {
        setError(e.message)
        if (e instanceof UnauthorizedError) {
          setCurrentAccount(undefined as any)

          navigate('/login')
        }
      })
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
