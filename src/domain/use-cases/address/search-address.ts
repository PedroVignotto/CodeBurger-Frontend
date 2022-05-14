import { HttpClient } from '@/domain/contracts/http'
import { FieldNotFoundError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient<{ district: string, street: string}>) => SearchAddress
type Input = { zipCode: string }
type Output = void
export type SearchAddress = (input: Input) => Promise<Output>

export const searchAddressUseCase: Setup = (url, httpClient) => async ({ zipCode }) => {
  const { statusCode } = await httpClient.request({ url: `${url}/${zipCode}`, method: 'get' })

  switch (statusCode) {
    case 200: break
    default: throw new FieldNotFoundError('zipCode')
  }
}
