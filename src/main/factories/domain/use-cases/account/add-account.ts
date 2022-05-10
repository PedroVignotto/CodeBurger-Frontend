import { makeHttpClient, makeApiUrl } from '@/main/factories/infra/http'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'

export const makeAddAccount = (): AddAccount =>
  addAccountUseCase(makeApiUrl('/signup'), makeHttpClient())
