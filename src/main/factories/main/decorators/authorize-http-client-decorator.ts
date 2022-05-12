import { makeLocalStorageAdapter } from '@/main/factories/infra/cache'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeHttpClient } from '@/main/factories/infra/http'
import { HttpClient } from '@/domain/contracts/http'

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeHttpClient())
