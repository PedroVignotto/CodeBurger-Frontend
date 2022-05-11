import { Product } from '@/domain/models'

export type Category = {
  id: string
  name: string
  products: Product[]
}
