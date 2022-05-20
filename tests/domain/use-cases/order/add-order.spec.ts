import { productParams, httpClientParams } from '@/tests/mocks'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'
import { HttpClient } from '@/domain/contracts/http'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddOrderUseCase', () => {
  let sut: AddOrder

  const { id } = productParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 201 })
  })

  beforeEach(() => {
    sut = addOrderUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ productsId: [id] })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { productsId: [id] } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut({ productsId: [id] })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnauthorizedError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut({ productsId: [id] })

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })
})
