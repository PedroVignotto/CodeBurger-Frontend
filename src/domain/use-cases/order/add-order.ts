import { HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient) => AddOrder
type Input = { productsId: string[] }
type Output = void
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = (url, httpClient) => async (input) => {
  await httpClient.request({ url, method: 'post', body: input })
}
