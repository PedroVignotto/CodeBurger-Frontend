import { HttpClient, HttpRequest, HttpResponse } from '@/domain/contracts/http'

import axios from 'axios'

export class AxiosAdapter implements HttpClient {
  async request ({ url, method, body, headers }: HttpRequest): Promise<HttpResponse> {
    const { status, data } = await axios.request({ url, method, data: body, headers })

    return { statusCode: status, data }
  }
}
