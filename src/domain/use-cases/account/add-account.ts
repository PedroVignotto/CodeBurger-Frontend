import { HttpClient } from '@/domain/contracts/http'
import { FieldInUseError, UnexpectedError } from '@/domain/errors'
import { Account } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Account>) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (url, httpClient) => async (input) => {
  const { statusCode } = await httpClient.request({ url, method: 'post', body: input })

  switch (statusCode) {
    case 201: break
    case 403: throw new FieldInUseError('email')
    default: throw new UnexpectedError()
  }
}