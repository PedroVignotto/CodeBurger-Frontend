import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError } from '@/domain/errors'
import { Address } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Address[]>) => ListAddresses
type Output = void
export type ListAddresses = () => Promise<Output>

export const listAddressesUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode } = await httpClient.request({ url, method: 'get' })

  switch (statusCode) {
    case 200: break
    default: throw new UnauthorizedError()
  }
}
