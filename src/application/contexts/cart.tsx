import { Product } from '@/domain/models'

import React, { createContext, ReactNode, useState } from 'react'

export type Cart = { quantity: number, product: Product }

export type ContextProps = {
  cart: Cart[]
  addToCart: (product: Product) => void
  updateQuantity: (id: string, quantity: number) => void
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

  const updateQuantity = (id: string, quantity: number): void => {
    const products = cart

    const productIndex = products.findIndex(p => p.product.id === id)

    if (quantity <= 0) products.splice(productIndex, 1)
    else if (productIndex >= 0) products[productIndex].quantity = quantity

    setCart([...products])
  }

  return <CartContext.Provider value={{ addToCart, cart, updateQuantity }}>{children}</CartContext.Provider>
}
