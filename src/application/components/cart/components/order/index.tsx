import { Payment, Products } from '@/application/components/cart/components'
import { useCart, useOrder } from '@/application/hooks'

import { toast } from 'react-toastify'
import React, { useState } from 'react'

export const Order: React.FC = () => {
  const { addOrder } = useOrder()
  const { products } = useCart()

  const [loading, setLoading] = useState(false)

  const handleCreateOrder = async (): Promise<void> => {
    try {
      if (loading) return

      setLoading(true)

      await addOrder({ productsId: products })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Products />
      <Payment loading={loading} handleCreateOrder={handleCreateOrder} />
    </>
  )
}
