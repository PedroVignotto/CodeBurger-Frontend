import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { ListAddresses, listAddressesUseCase } from '@/domain/use-cases/address'

export const makeListAddresses = (): ListAddresses =>
  listAddressesUseCase(makeApiUrl('/addresses'), makeAuthorizeHttpClientDecorator())
