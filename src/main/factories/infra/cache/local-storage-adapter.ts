import { GetStorage, SetStorage } from '@/domain/contracts/cache'
import { LocalStorageAdapter } from '@/infra/cache'

export const makeLocalStorageAdapter = (): SetStorage & GetStorage => new LocalStorageAdapter()
