import { Product } from '@/domain/models'

import React, { createContext, ReactNode, useState } from 'react'

export type Cart = { quantity: number, product: Product }

export type ContextProps = {
  cart: Cart[]
  addToCart: (product: Product) => void
  updateQuantity: (id: string, quantity: number) => void
  products: string[]
}

export const CartContext = createContext<ContextProps>(null as any)

type ProviderProps = { children: ReactNode }

export function CartProvider ({ children }: ProviderProps): any {
  const [cart, setCart] = useState<Cart[]>([])
  const [products, setProducts] = useState<string[]>([])

  const addToCart = (product: Product): void => {
    const addProduct = cart
    const productsId = products

    const productIndex = addProduct.findIndex(p => p.product.id === product.id)

    if (productIndex >= 0) addProduct[productIndex].quantity += 1
    else addProduct.push({ quantity: 1, product })

    productsId.push(product.id)

    setCart([...addProduct])
    setProducts([...productsId])
  }

  const updateQuantity = (id: string, quantity: number): void => {
    const updateProduct = cart
    const productsId = products

    const productIndex = updateProduct.findIndex(p => p.product.id === id)
    const productIdIndex = productsId.findIndex(p => p === id)

    if (quantity <= 0) {
      updateProduct.splice(productIndex, 1)
      productsId.splice(productIdIndex, 1)
    } else if (productIndex >= 0) {
      if (updateProduct[productIndex].quantity < quantity) productsId.push(id)
      else productsId.splice(productIdIndex, 1)

      updateProduct[productIndex].quantity = quantity
    }

    setCart([...updateProduct])
    setProducts([...productsId])
  }

  return <CartContext.Provider value={{ addToCart, cart, updateQuantity, products }}>{children}</CartContext.Provider>
}
