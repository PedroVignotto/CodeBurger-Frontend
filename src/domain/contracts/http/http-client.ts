export interface HttpClient {
  request: (data: HttpRequest) => Promise<void>
}

export type HttpRequest = { url: string, method: HttpMethod, body?: any }

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'
