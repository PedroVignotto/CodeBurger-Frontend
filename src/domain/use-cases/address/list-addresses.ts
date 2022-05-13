import { HttpClient } from '@/domain/contracts/http'
import { Address } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Address[]>) => ListAddresses
type Output = void
export type ListAddresses = () => Promise<Output>

export const listAddressesUseCase: Setup = (url, httpClient) => async () => {
  await httpClient.request({ url, method: 'get' })
}
