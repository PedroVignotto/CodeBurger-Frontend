import { productParams, httpClientParams } from '@/tests/mocks'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('AddOrderUseCase', () => {
  let sut: AddOrder

  const { id } = productParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = addOrderUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ productsId: [id] })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { productsId: [id] } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
