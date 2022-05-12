import { makeApiUrl } from '@/main/factories/infra/http'
import { ListCategories, listCategoriesUseCase } from '@/domain/use-cases/category'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeListCategories = (): ListCategories =>
  listCategoriesUseCase(makeApiUrl('/categories'), makeAuthorizeHttpClientDecorator())
