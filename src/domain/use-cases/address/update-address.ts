import { HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => UpdateAddress
type Input = { id: string, surname?: string, number?: number, complement?: string }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = (url, httpClient) => async ({ id, ...input }) => {
  const { statusCode } = await httpClient.request({ url: `${url}/${id}`, method: 'post', body: input })

  switch (statusCode) {
    case 204: break
    default: throw new UnexpectedError()
  }
}
