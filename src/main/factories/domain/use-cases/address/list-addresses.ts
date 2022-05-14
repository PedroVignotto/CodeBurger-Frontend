import { makeApiUrl } from '@/main/factories/infra/http'
import { ListAddresses, listAddressesUseCase } from '@/domain/use-cases/address'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeListAddresses = (): ListAddresses =>
  listAddressesUseCase(makeApiUrl('/addresses'), makeAuthorizeHttpClientDecorator())
