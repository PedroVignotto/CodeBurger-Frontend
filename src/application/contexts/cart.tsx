import { Product } from '@/domain/models'

import React, { createContext, ReactNode, useState } from 'react'

export type Cart = { quantity: number, product: Product }

export type ContextProps = {
  cart: Cart[]
  addToCart: (product: Product) => void
}

export const CartContext = createContext<ContextProps>(null as any)

type ProviderProps = { children: ReactNode }

export function CartProvider ({ children }: ProviderProps): any {
  const [cart, setCart] = useState<Cart[]>([])

  const addToCart = (product: Product): void => {
    const addProduct = cart

    const productIndex = addProduct.findIndex(p => p.product.id === product.id)

    if (productIndex >= 0) addProduct[productIndex].quantity += 1
    else addProduct.push({ quantity: 1, product })

    setCart([...addProduct])
  }

  return <CartContext.Provider value={{ addToCart, cart }}>{children}</CartContext.Provider>
}
