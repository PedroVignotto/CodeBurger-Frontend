import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => AddOrder
type Input = { productsId: string[] }
type Output = void
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = (url, httpClient) => async (input) => {
  const { statusCode } = await httpClient.request({ url, method: 'post', body: input })

  switch (statusCode) {
    case 201: break
    case 401: throw new UnauthorizedError()
    default: throw new UnexpectedError()
  }
}
