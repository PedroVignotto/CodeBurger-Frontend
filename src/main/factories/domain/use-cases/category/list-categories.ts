import { makeHttpClient, makeApiUrl } from '@/main/factories/infra/http'
import { ListCategories, listCategoriesUseCase } from '@/domain/use-cases/category'

export const makeListCategories = (): ListCategories =>
  listCategoriesUseCase(makeApiUrl('/categories'), makeHttpClient())
