import { addressParams, httpClientParams } from '@/tests/mocks'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('UpdateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id, surname, number, complement } = addressParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 201, data: addressParams })
  })

  beforeEach(() => {
    sut = updateAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ id, surname, number, complement })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/${id}`, method: 'post', body: { surname, number, complement } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
