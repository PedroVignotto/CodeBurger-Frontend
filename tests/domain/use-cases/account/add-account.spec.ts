import { accountParams, httpClientParams } from '@/tests/mocks'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { FieldInUseError, UnexpectedError } from '@/domain/errors'
import { HttpClient } from '@/domain/contracts/http'

import { mock } from 'jest-mock-extended'

describe('AddAccountUseCase', () => {
  let sut: AddAccount

  const { name, email, password, accessToken } = accountParams
  const { url } = httpClientParams

  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 201, data: { name, accessToken } })
  })

  beforeEach(() => {
    sut = addAccountUseCase(url, httpClient)
  })

  it('Should call HttpClient with correct values', async () => {
    await sut({ name, email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { name, email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw FieldInUseError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an account if HttpClient returns 201', async () => {
    const result = await sut({ name, email, password })

    expect(result).toEqual({ name, accessToken })
  })
})
