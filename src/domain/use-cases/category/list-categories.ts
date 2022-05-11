import { HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { Category } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Category>) => ListCategories
type Output = void
export type ListCategories = () => Promise<Output>

export const listCategoriesUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode } = await httpClient.request({ url, method: 'get' })

  switch (statusCode) {
    case 200: break
    case 401: throw new AccessDeniedError()
    default: throw new UnexpectedError()
  }
}
