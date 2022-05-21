import { productParams } from '@/tests/mocks'
import { AccountContext, Cart as CartType, CartContext, OrderContext } from '@/application/contexts'
import { Cart } from '@/application/components'
import { UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'

describe('Cart', () => {
  const { id, name, description, price, picture } = productParams

  const addToCart: jest.Mock = jest.fn()
  const addOrder: jest.Mock = jest.fn()
  const updateQuantity: jest.Mock = jest.fn()
  const setCurrentAccountMock: jest.Mock = jest.fn()
  const getCurrentAccountMock: jest.Mock = jest.fn()
  const cart: CartType[] = []
  const products: string[] = []

  afterEach(() => {
    cart.pop()
    products.pop()
  })

  beforeAll(() => {
    addOrder.mockResolvedValue('')
  })

  const makeSut = (quantity = 1, addProductOnCart = true): void => {
    if (addProductOnCart) {
      cart.push({ quantity, product: { id, name, description, price: +price, picture } })
      products.push(id)
    }

    render(
      <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
        <OrderContext.Provider value={{ addOrder }}>
          <CartContext.Provider value={{ addToCart, cart, updateQuantity, products }}>
            <BrowserRouter>
              <ToastContainer/>
              <Cart opened={true} setOpened={jest.fn()} />
            </BrowserRouter>
          </CartContext.Provider>
        </OrderContext.Provider>
      </AccountContext.Provider>
    )
  }

  it('Should show empty cart message if no have products', async () => {
    makeSut(1, false)

    expect(screen.getByTestId('emptyCart')).toBeInTheDocument()
  })

  it('Should show a list products', async () => {
    makeSut()

    expect(screen.queryByTestId('emptyCart')).not.toBeInTheDocument()
    expect(screen.getByText('1 item')).toBeInTheDocument()
    expect(screen.getByText(productParams.name)).toBeInTheDocument()
  })

  it('Should not add duplicated product on cart', async () => {
    makeSut(2)

    expect(screen.getByText('1 item')).toBeInTheDocument()
  })

  it('Should call updateQuantity when increment button is clicked', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('increment'))

    expect(updateQuantity).toHaveBeenCalledWith(id, 2)
    expect(updateQuantity).toHaveBeenCalledTimes(1)
  })

  it('Should call updateQuantity when decrement button is clicked', async () => {
    makeSut(2)

    fireEvent.click(screen.getByTestId('decrement'))

    expect(updateQuantity).toHaveBeenCalledWith(id, 1)
    expect(updateQuantity).toHaveBeenCalledTimes(1)
  })

  it('Should call addOrder with correct values', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('addOrder'))
    await waitFor(() => screen.getByTestId('closeCart'))

    expect(addOrder).toHaveBeenCalledWith({ productsId: [id] })
    expect(addOrder).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByTestId('closeCart'))
  })

  it('Should show spinner on submit', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('addOrder'))
    await waitFor(() => screen.getByTestId('closeCart'))

    expect(screen.getByTestId('addOrder')).not.toHaveTextContent('Finalizar pedido')
    await waitFor(() => screen.getByTestId('closeCart'))
  })

  it('Should call addOrder only once', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('addOrder'))
    fireEvent.click(screen.getByTestId('addOrder'))
    await waitFor(() => screen.getByTestId('closeCart'))

    expect(addOrder).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByTestId('closeCart'))
  })

  it('Should show alert error if addOrder fails', async () => {
    makeSut()
    addOrder.mockRejectedValueOnce(new UnexpectedError())

    fireEvent.click(screen.getByTestId('addOrder'))

    expect(await screen.findByText(new UnexpectedError().message)).toBeInTheDocument()
    expect(screen.getByTestId('addOrder')).toHaveTextContent('Finalizar pedido')
  })

  it('Should show success message if addOrder succeeds', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('addOrder'))
    await waitFor(() => screen.getByTestId('success'))

    expect(screen.queryByTestId('addOrder')).not.toBeInTheDocument()
    expect(screen.getByTestId('success')).toBeInTheDocument()
    await waitFor(() => screen.getByTestId('closeCart'))
  })
})
