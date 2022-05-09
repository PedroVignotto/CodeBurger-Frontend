import { SetStorage } from '@/domain/contracts/cache'
import { LocalStorageAdapter } from '@/infra/cache'

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter()
