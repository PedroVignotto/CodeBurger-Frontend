import { HttpClient, HttpRequest, HttpResponse } from '@/domain/contracts/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosAdapter implements HttpClient {
  async request ({ url, method, body, headers }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({ url, method, data: body, headers })
    } catch (error: any) { axiosResponse = error.response }

    return { statusCode: axiosResponse.status, data: axiosResponse.data }
  }
}
