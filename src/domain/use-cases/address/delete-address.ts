import { HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient) => DeleteAddress
type Output = void
export type DeleteAddress = () => Promise<Output>

export const deleteAddressUseCase: Setup = (url, httpClient) => async () => {
  await httpClient.request({ url, method: 'delete' })
}
