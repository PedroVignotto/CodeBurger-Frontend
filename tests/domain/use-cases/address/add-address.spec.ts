import { addressParams, httpClientParams } from '@/tests/mocks'
import { AddAddress, addAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  const { id, ...address } = addressParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = addAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut(address)

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: address })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
