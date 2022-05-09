import { httpClientParams } from '@/tests/mocks'
import { AxiosAdapter } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

describe('AxiosAdapter', () => {
  let sut: AxiosAdapter

  const { url, method, body, headers, statusCode, data } = httpClientParams

  const fakeAxios = axios as jest.Mocked<typeof axios>

  beforeAll(() => {
    fakeAxios.request.mockResolvedValue({ status: statusCode, data })
  })

  beforeEach(() => {
    sut = new AxiosAdapter()
  })

  it('Should call request with correct values', async () => {
    await sut.request({ url, method, body, headers })

    expect(fakeAxios.request).toHaveBeenCalledWith({ url, method, data: body, headers })
    expect(fakeAxios.request).toHaveBeenCalledTimes(1)
  })

  it('Should return correct response', async () => {
    const httpResponse = await sut.request({ url, method, body, headers })

    expect(httpResponse.statusCode).toBe(statusCode)
    expect(httpResponse.data).toEqual(data)
  })

  it('Should return correct error', async () => {
    fakeAxios.request.mockRejectedValueOnce({ response: { status: statusCode, data } })

    const result = await sut.request({ url, method, body, headers })

    expect(result).toEqual({ statusCode, data })
  })
})
