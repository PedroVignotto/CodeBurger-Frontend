import { CartContext, ContextProps } from '@/application/contexts'

import { useContext } from 'react'

export const useCart = (): ContextProps => {
  const context = useContext(CartContext)

  return context
}
