export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpResponse<T = any> = { statusCode: number, data?: T }

export type HttpRequest = { url: string, method: HttpMethod, body?: any }

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'
