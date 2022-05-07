import { accountParams, httpClientParams } from '@/tests/mocks'
import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('AuthenticationUseCase', () => {
  let sut: Authentication

  const { email, password } = accountParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = authenticationUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
