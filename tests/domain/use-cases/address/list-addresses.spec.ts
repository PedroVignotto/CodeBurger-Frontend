import { httpClientParams } from '@/tests/mocks'
import { ListAddresses, listAddressesUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('ListAddressesUseCase', () => {
  let sut: ListAddresses

  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = listAddressesUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
