import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'
import { Category } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Category[]>) => ListCategories
type Output = Category[]
export type ListCategories = () => Promise<Output>

export const listCategoriesUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode, data } = await httpClient.request({ url, method: 'get' })

  switch (statusCode) {
    case 200: return data!
    case 401: throw new UnauthorizedError()
    default: throw new UnexpectedError()
  }
}
