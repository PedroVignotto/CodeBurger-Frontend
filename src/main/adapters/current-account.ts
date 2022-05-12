import { makeLocalStorageAdapter } from '@/main/factories/infra/cache'
import { Account } from '@/domain/models'

export const setCurrentAccountAdapter = (account: Account): void =>
  makeLocalStorageAdapter().set({ key: 'account', value: account })

export const getCurrentAccountAdapter = (): Account =>
  makeLocalStorageAdapter().get({ key: 'account' })
