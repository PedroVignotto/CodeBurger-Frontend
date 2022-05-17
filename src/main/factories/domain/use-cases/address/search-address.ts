import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { SearchAddress, searchAddressUseCase } from '@/domain/use-cases/address'

export const makeSearchAddress = (): SearchAddress =>
  searchAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
