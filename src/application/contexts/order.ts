import { AddOrder } from '@/domain/use-cases/order'

import { createContext } from 'react'

export type Props = { addOrder: AddOrder }

export const OrderContext = createContext<Props>(null as any)
