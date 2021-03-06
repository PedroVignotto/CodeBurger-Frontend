import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => UpdateAddress
type Input = { id: string, surname?: string, number?: number, complement?: string, active?: boolean }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = (url, httpClient) => async ({ id, ...input }) => {
  const { statusCode } = await httpClient.request({ url: `${url}/${id}`, method: 'put', body: input })

  switch (statusCode) {
    case 204: break
    case 401: throw new UnauthorizedError()
    default: throw new UnexpectedError()
  }
}
