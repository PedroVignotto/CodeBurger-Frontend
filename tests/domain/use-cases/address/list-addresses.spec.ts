import { addressParams, httpClientParams } from '@/tests/mocks'
import { ListAddresses, listAddressesUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('ListAddressesUseCase', () => {
  let sut: ListAddresses

  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: [addressParams] })
  })

  beforeEach(() => {
    sut = listAddressesUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return address data if HttpClient returns 200', async () => {
    const result = await sut()

    expect(result).toEqual([addressParams])
  })

  it('Should return [] if HttpClient returns 200', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 200, data: [] })

    const result = await sut()

    expect(result).toEqual([])
  })
})
