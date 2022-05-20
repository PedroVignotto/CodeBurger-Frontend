import { createContext } from 'react'

type Props = {
  addOrder: (productsId: string[]) => void
}

export const OrderContext = createContext<Props>(null as any)
