import { addressParams, httpClientParams } from '@/tests/mocks'
import { AddAddress, addAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  const { id, ...address } = addressParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 201, data: addressParams })
  })

  beforeEach(() => {
    sut = addAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut(address)

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: address })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut(address)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut(address)

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut(address)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an address if HttpClient returns 201', async () => {
    const result = await sut(address)

    expect(result).toEqual(addressParams)
  })
})
