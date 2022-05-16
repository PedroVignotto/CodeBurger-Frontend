import { HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient) => UpdateAddress
type Input = { id: string, surname?: string, number?: number, complement?: string }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = (url, httpClient) => async ({ id, ...input }) => {
  await httpClient.request({ url: `${url}/${id}`, method: 'post', body: input })
}
