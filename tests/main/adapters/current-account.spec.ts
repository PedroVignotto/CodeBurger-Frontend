import { accountParams } from '@/tests/mocks'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { LocalStorageAdapter } from '@/infra/cache'

import { mocked } from 'jest-mock'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  const { name, accessToken } = accountParams

  const setSpy = jest.fn()
  const getSpy = jest.fn()

  mocked(LocalStorageAdapter).mockImplementation(jest.fn().mockImplementation(() => ({ set: setSpy, get: getSpy })))

  describe('set()', () => {
    it('Should call LocalStorageAdapter.set with correct values', () => {
      setCurrentAccountAdapter({ name, accessToken })

      expect(setSpy).toHaveBeenCalledWith({ key: 'account', value: { name, accessToken } })
    })
  })

  describe('get()', () => {
    it('Should call LocalStorageAdapter.get with correct values', () => {
      getSpy.mockReturnValueOnce({ name, accessToken })

      const account = getCurrentAccountAdapter()

      expect(getSpy).toHaveBeenCalledWith({ key: 'account' })
      expect(account).toEqual({ name, accessToken })
    })
  })
})
