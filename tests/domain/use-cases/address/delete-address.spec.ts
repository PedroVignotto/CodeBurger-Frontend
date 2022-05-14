import { httpClientParams } from '@/tests/mocks'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 204 })
  })

  beforeEach(() => {
    sut = deleteAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'delete' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
