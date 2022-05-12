import { GetStorage, SetStorage } from '@/domain/contracts/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set ({ key, value }: SetStorage.Input): SetStorage.Output {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get ({ key }: GetStorage.Input): GetStorage.Output {
    const value = localStorage.getItem(key)

    return JSON.parse(value!)
  }
}
