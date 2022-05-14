import { HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => DeleteAddress
type Output = void
export type DeleteAddress = () => Promise<Output>

export const deleteAddressUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode } = await httpClient.request({ url, method: 'delete' })

  switch (statusCode) {
    case 204: break
    default: throw new UnexpectedError()
  }
}
