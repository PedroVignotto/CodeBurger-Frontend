import { makeApiUrl } from '@/main/factories/infra/http'
import { SearchAddress, searchAddressUseCase } from '@/domain/use-cases/address'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeSearchAddress = (): SearchAddress =>
  searchAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
