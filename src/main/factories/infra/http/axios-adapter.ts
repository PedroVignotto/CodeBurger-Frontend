import { HttpClient } from '@/domain/contracts/http'
import { AxiosAdapter } from '@/infra/http'

export const makeHttpClient = (): HttpClient => new AxiosAdapter()
