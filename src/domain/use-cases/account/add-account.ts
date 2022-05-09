import { HttpClient } from '@/domain/contracts/http'
import { Account } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Account>) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (url, httpClient) => async (input) => {
  await httpClient.request({ url, method: 'post', body: input })
}
