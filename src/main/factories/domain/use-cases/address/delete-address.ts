import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'

export const makeDeleteAddress = (): DeleteAddress =>
  deleteAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
