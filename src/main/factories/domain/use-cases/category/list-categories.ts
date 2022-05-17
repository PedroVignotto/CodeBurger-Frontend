import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { ListCategories, listCategoriesUseCase } from '@/domain/use-cases/category'

export const makeListCategories = (): ListCategories =>
  listCategoriesUseCase(makeApiUrl('/categories'), makeAuthorizeHttpClientDecorator())
