import { HttpClient } from '@/domain/contracts/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Account } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Account>) => Authentication
type Input = { email: string, password: string }
type Output = Account
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (url, httpClient) => async (input) => {
  const { statusCode, data } = await httpClient.request({ url, method: 'post', body: input })

  switch (statusCode) {
    case 200: return data!
    case 401: throw new InvalidCredentialsError()
    default: throw new UnexpectedError()
  }
}
