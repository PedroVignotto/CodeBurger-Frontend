import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => DeleteAddress
type Input = { id: string }
type Output = void
export type DeleteAddress = (input: Input) => Promise<Output>

export const deleteAddressUseCase: Setup = (url, httpClient) => async ({ id }) => {
  const { statusCode } = await httpClient.request({ url: `${url}/${id}`, method: 'delete' })

  switch (statusCode) {
    case 204: break
    case 401: throw new UnauthorizedError()
    default: throw new UnexpectedError()
  }
}
