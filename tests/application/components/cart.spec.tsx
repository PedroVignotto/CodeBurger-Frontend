import { Cart as CartType, CartContext } from '@/application/contexts'
import { Cart } from '@/application/components'

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Cart', () => {
  const addToCart: jest.Mock = jest.fn()
  const cart: CartType[] = []

  const makeSut = (): void => {
    render(
      <CartContext.Provider value={{ addToCart, cart }}>
        <BrowserRouter>
          <Cart opened={true} setOpened={jest.fn()} />
        </BrowserRouter>
      </CartContext.Provider>
    )
  }

  it('Should show empty cart message if no have products', async () => {
    makeSut()

    expect(screen.getByTestId('emptyCart')).toBeInTheDocument()
  })
})
