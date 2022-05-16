import { makeApiUrl } from '@/main/factories/infra/http'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeUpdateAddress = (): UpdateAddress =>
  updateAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
