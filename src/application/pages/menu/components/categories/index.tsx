import { Skeleton, Products } from '@/application/pages/menu/components'
import { Category } from '@/domain/models'

import { Container } from './styles'

import React from 'react'

type Props = { categories: Category[] }

export const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <>
    {categories.length
      ? categories.map(category =>
        <Container key={category.id}>
          <h3>{category.products.length >= 1 && category.name}</h3>
          <ul>
            <Products products={category.products} />
          </ul>
        </Container>
      )
      : <Skeleton />
    }
    </>
  )
}
