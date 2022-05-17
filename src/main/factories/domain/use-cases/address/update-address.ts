import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'

export const makeUpdateAddress = (): UpdateAddress =>
  updateAddressUseCase(makeApiUrl('/address'), makeAuthorizeHttpClientDecorator())
