import { accountParams, httpClientParams } from '@/tests/mocks'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'
import { FieldInUseError } from '@/domain/errors'

describe('AddAccountUseCase', () => {
  let sut: AddAccount

  const { name, email, password, accessToken } = accountParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: { name, accessToken } })
  })

  beforeEach(() => {
    sut = addAccountUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ name, email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { name, email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw EmailInUseError if HttpClient returns 403', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 403 })

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })
})
