import { HttpClient, HttpRequest, HttpResponse } from '@/domain/contracts/http'
import { GetStorage } from '@/domain/contracts/cache'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (private readonly getStorage: GetStorage) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    this.getStorage.get({ key: 'account' })

    return null as any
  }
}
