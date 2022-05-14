import { addressParams, httpClientParams } from '@/tests/mocks'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'
import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { id } = addressParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 204 })
  })

  beforeEach(() => {
    sut = deleteAddressUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ id })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/${id}`, method: 'delete' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should delete an address if HttpClient returns 204', async () => {
    const result = await sut({ id })

    expect(result).toBeUndefined()
  })
})
