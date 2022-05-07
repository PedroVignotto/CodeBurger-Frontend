import { httpClientParams } from '@/tests/mocks'
import { AxiosAdapter } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

describe('AxiosAdapter', () => {
  let sut: AxiosAdapter

  const { url, method, body, headers } = httpClientParams

  const fakeAxios = axios as jest.Mocked<typeof axios>

  beforeEach(() => {
    sut = new AxiosAdapter()
  })

  it('Should call request with correct values', async () => {
    await sut.request({ url, method, body, headers })

    expect(fakeAxios.request).toHaveBeenCalledWith({ url, method, data: body, headers })
    expect(fakeAxios.request).toHaveBeenCalledTimes(1)
  })
})
