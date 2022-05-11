import { HttpClient } from '@/domain/contracts/http'
import { Category } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Category>) => ListCategories
type Output = void
export type ListCategories = () => Promise<Output>

export const listCategoriesUseCase: Setup = (url, httpClient) => async () => {
  await httpClient.request({ url, method: 'get' })
}
