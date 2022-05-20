import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'

export const makeAddOrder = (): AddOrder =>
  addOrderUseCase(makeApiUrl('/order'), makeAuthorizeHttpClientDecorator())
