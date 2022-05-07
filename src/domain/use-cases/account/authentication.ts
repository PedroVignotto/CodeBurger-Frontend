import { HttpClient } from '@/domain/contracts/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => Authentication
type Input = { email: string, password: string }
type Output = undefined | Error
export type Authentication = (input: Input) => Promise<Output>

export const authenticationUseCase: Setup = (url, httpClient) => async (input) => {
  const httpResponse = await httpClient.request({ url, method: 'post', body: input })

  switch (httpResponse.statusCode) {
    case 400: throw new UnexpectedError()
    case 401: throw new InvalidCredentialsError()
    default: return undefined
  }
}
