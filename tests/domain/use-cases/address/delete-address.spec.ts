import { httpClientParams } from '@/tests/mocks'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('DeleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = deleteAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'delete' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
