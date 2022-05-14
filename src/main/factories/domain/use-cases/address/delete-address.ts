import { makeApiUrl } from '@/main/factories/infra/http'
import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeDeleteAddress = (): DeleteAddress =>
  deleteAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
