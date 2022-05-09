import { SetStorage } from '@/domain/contracts/cache'

export class LocalStorageAdapter implements SetStorage {
  set ({ key, value }: SetStorage.Input): SetStorage.Output {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
