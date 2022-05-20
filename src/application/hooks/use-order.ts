import { OrderContext, Props } from '@/application/contexts'

import { useContext } from 'react'

export const useOrder = (): Props => {
  const context = useContext(OrderContext)

  return context
}
