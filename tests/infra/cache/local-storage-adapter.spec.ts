import { LocalStorageAdapter } from '@/infra/cache'

import 'jest-localstorage-mock'
import faker from 'faker'

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter

  let key: string
  let value: object

  beforeAll(() => {
    key = faker.database.column()
    value = faker.random.objectElement<{}>()
  })

  beforeEach(() => {
    sut = new LocalStorageAdapter()

    localStorage.clear()
  })

  describe('set()', () => {
    it('Should call localStorage.setItem with correct values', async () => {
      sut.set({ key, value })

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })
  })

  describe('get()', () => {
    it('Should call localStorage.getItem with correct key', async () => {
      const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))

      const result = sut.get({ key })

      expect(getItemSpy).toHaveBeenCalledWith(key)
      expect(result).toEqual(value)
    })
  })
})
