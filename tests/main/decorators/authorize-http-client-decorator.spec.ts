import { httpClientParams } from '@/tests/mocks'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { GetStorage } from '@/domain/contracts/cache'

import { mock } from 'jest-mock-extended'

describe('AuthorizeHttpClientDecorator', () => {
  let sut: AuthorizeHttpClientDecorator

  const { url, method, body, headers } = httpClientParams

  const getStorage = mock<GetStorage>()

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(getStorage)
  })

  it('Should call GetStorage with correct value', async () => {
    await sut.request({ url, method, body, headers })

    expect(getStorage.get).toHaveBeenCalledWith({ key: 'account' })
  })
})
