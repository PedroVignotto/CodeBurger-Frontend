import { HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => AddAddress
type Input = { surname: string, zipCode: string, district: string, street: string, number: number, complement?: string }
type Output = void
export type AddAddress = (input: Input) => Promise<Output>

export const addAddressUseCase: Setup = (url, httpClient) => async (input) => {
  const { statusCode } = await httpClient.request({ url, method: 'post', body: input })

  switch (statusCode) {
    case 201: break
    default: throw new UnexpectedError()
  }
}
