import { accountParams } from '@/tests/mocks'
import { setCurrentAccountAdapter } from '@/main/adapters'
import { LocalStorageAdapter } from '@/infra/cache'

import { mocked } from 'jest-mock'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  const { name, accessToken } = accountParams

  const setSpy = jest.fn()

  mocked(LocalStorageAdapter).mockImplementation(jest.fn().mockImplementation(() => ({ set: setSpy })))

  it('Should call LocalStorageAdapter.set with correct values', () => {
    setCurrentAccountAdapter({ name, accessToken })

    expect(setSpy).toHaveBeenCalledWith({ key: 'account', value: { name, accessToken } })
  })
})
