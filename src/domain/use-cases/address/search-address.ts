import { HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient<{ district: string, street: string}>) => SearchAddress
type Input = { zipCode: string }
type Output = void
export type SearchAddress = (input: Input) => Promise<Output>

export const searchAddressUseCase: Setup = (url, httpClient) => async ({ zipCode }) => {
  await httpClient.request({ url: `${url}/${zipCode}`, method: 'get' })
}
