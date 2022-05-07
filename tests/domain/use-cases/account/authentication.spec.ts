import { accountParams, httpClientParams } from '@/tests/mocks'
import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { InvalidCredentialsError } from '@/domain/errors'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('AuthenticationUseCase', () => {
  let sut: Authentication

  const { email, password } = accountParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200 })
  })

  beforeEach(() => {
    sut = authenticationUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
