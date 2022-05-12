import { HttpClient, HttpRequest, HttpResponse } from '@/domain/contracts/http'
import { GetStorage } from '@/domain/contracts/cache'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    this.getStorage.get({ key: 'account' })

    return await this.httpClient.request(data)
  }
}
