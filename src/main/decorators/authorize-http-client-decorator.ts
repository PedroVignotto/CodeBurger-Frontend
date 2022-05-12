import { HttpClient, HttpRequest, HttpResponse } from '@/domain/contracts/http'
import { GetStorage } from '@/domain/contracts/cache'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get({ key: 'account' })

    if (account?.accessToken) Object.assign(data, { headers: { authorization: `Bearer: ${account.accessToken as string}` } })

    return await this.httpClient.request(data)
  }
}
