import { httpClientParams } from '@/tests/mocks'
import { ListCategories, listCategoriesUseCase } from '@/domain/use-cases/category'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('ListCategoriesUseCase', () => {
  let sut: ListCategories

  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = listCategoriesUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
