import { makeApiUrl } from '@/main/factories/infra/http'
import { AddAddress, addAddressUseCase } from '@/domain/use-cases/address'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeAddAddress = (): AddAddress =>
  addAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
