import { Payment, Products, Success } from '@/application/components/cart/components'
import { useCart, useError, useOrder } from '@/application/hooks'

import { toast } from 'react-toastify'
import React, { useState } from 'react'

export const Order: React.FC = () => {
  const { addOrder } = useOrder()
  const { products } = useCart()
  const handleError = useError(error => toast.error(error.message))

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleCreateOrder = async (): Promise<void> => {
    try {
      if (loading) return

      setLoading(true)

      await addOrder({ productsId: products })

      setSuccess(true)
    } catch (error: any) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {success
        ? <Success />
        : <>
          <Products />
          <Payment loading={loading} handleCreateOrder={handleCreateOrder} />
        </>
      }
    </>
  )
}
