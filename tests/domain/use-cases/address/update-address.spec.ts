import { addressParams, httpClientParams } from '@/tests/mocks'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('UpdateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id, surname, number, complement } = addressParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 204 })
  })

  beforeEach(() => {
    sut = updateAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ id, surname, number, complement })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/${id}`, method: 'post', body: { surname, number, complement } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut({ id, surname, number, complement })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
