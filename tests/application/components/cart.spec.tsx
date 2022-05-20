import { productParams } from '@/tests/mocks'
import { Cart as CartType, CartContext, OrderContext } from '@/application/contexts'
import { Cart } from '@/application/components'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Cart', () => {
  const { id, name, description, price, picture } = productParams

  const addToCart: jest.Mock = jest.fn()
  const addOrder: jest.Mock = jest.fn()
  const updateQuantity: jest.Mock = jest.fn()
  const cart: CartType[] = []
  const products: string[] = []

  afterEach(() => {
    cart.pop()
  })

  const makeSut = (): void => {
    render(
      <OrderContext.Provider value={{ addOrder }}>
        <CartContext.Provider value={{ addToCart, cart, updateQuantity, products }}>
          <BrowserRouter>
            <Cart opened={true} setOpened={jest.fn()} />
          </BrowserRouter>
        </CartContext.Provider>
      </OrderContext.Provider>
    )
  }

  it('Should show empty cart message if no have products', async () => {
    makeSut()

    expect(screen.getByTestId('emptyCart')).toBeInTheDocument()
  })

  it('Should show a list products', async () => {
    cart.push({ quantity: 1, product: { id, name, description, price: +price, picture } })
    makeSut()

    expect(screen.queryByTestId('emptyCart')).not.toBeInTheDocument()
    expect(screen.getByText('1 item')).toBeInTheDocument()
    expect(screen.getByText(productParams.name)).toBeInTheDocument()
  })

  it('Should not add duplicated product on cart', async () => {
    cart.push({ quantity: 2, product: { id, name, description, price: +price, picture } })
    makeSut()

    expect(screen.getByText('1 item')).toBeInTheDocument()
  })

  it('Should call updateQuantity when increment button is clicked', async () => {
    cart.push({ quantity: 1, product: { id, name, description, price: +price, picture } })
    makeSut()

    fireEvent.click(screen.getByTestId('increment'))

    expect(updateQuantity).toHaveBeenCalledWith(id, 2)
    expect(updateQuantity).toHaveBeenCalledTimes(1)
  })

  it('Should call updateQuantity when decrement button is clicked', async () => {
    cart.push({ quantity: 2, product: { id, name, description, price: +price, picture } })
    makeSut()

    fireEvent.click(screen.getByTestId('decrement'))

    expect(updateQuantity).toHaveBeenCalledWith(id, 1)
    expect(updateQuantity).toHaveBeenCalledTimes(1)
  })

  it('Should call addOrder with correct values', async () => {
    cart.push({ quantity: 1, product: { id, name, description, price: +price, picture } })
    products.push(id)
    makeSut()

    fireEvent.click(screen.getByRole('button', { name: /Finalizar pedido/i }))

    expect(addOrder).toHaveBeenCalledWith({ productsId: [id] })
    expect(addOrder).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByTestId('closeCart'))
  })

  it('Should show spinner on submit', async () => {
    cart.push({ quantity: 1, product: { id, name, description, price: +price, picture } })
    products.push(id)
    makeSut()

    fireEvent.click(screen.getByRole('button', { name: /Finalizar pedido/i }))

    expect(screen.queryByRole('button', { name: /Finalizar pedido/i })).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('closeCart'))
  })
})
