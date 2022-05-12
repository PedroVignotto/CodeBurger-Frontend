import { makeListCategories } from '@/main/factories/domain/use-cases/category'
import { Menu } from '@/application/pages'

import React from 'react'

export const makeMenu: React.FC = () =>
  (<Menu listCategories={makeListCategories()} />)
