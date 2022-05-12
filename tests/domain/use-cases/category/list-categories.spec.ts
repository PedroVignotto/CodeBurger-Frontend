import { categoryParams, httpClientParams, productParams } from '@/tests/mocks'
import { ListCategories, listCategoriesUseCase } from '@/domain/use-cases/category'
import { HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('ListCategoriesUseCase', () => {
  let sut: ListCategories

  const { id, name } = categoryParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: [{ id, name, products: [productParams] }] })
  })

  beforeEach(() => {
    sut = listCategoriesUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw AccessDeniedError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return category data if HttpClient returns 200', async () => {
    const result = await sut()

    expect(result).toEqual([{ id, name, products: [productParams] }])
  })

  it('Should return [] if HttpClient returns 200', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 200, data: [] })

    const result = await sut()

    expect(result).toEqual([])
  })
})
