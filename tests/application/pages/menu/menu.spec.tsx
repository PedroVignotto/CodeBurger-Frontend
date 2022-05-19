import { categoryParams, productParams } from '@/tests/mocks'
import { Menu } from '@/application/pages'
import { AccountContext, CartContext } from '@/application/contexts'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Menu', () => {
  const { id, name } = categoryParams

  const listCategories: jest.Mock = jest.fn()
  const addToCart: jest.Mock = jest.fn()
  const setCurrentAccountMock: jest.Mock = jest.fn()
  const getCurrentAccountMock: jest.Mock = jest.fn()

  beforeAll(() => {
    listCategories.mockResolvedValue([{ id, name, products: [productParams] }])
  })

  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
        <CartContext.Provider value={{ addToCart, cart: [] }}>
          <BrowserRouter>
            <Menu listCategories={listCategories} />
          </BrowserRouter>
        </CartContext.Provider>
      </AccountContext.Provider>
    )
  }

  it('Should load with correct initial state', async () => {
    listCategories.mockResolvedValueOnce([])

    makeSut()

    expect(screen.getAllByRole('list')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
    expect(screen.queryByRole('button', { name: /Tentar novamente/i })).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('menu'))
  })

  it('Should call listCategories', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('list'))

    expect(listCategories).toHaveBeenCalledTimes(1)
  })

  it('Should render categories on success', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('list'))

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.queryByRole('button', { name: /Tentar novamente/i })).not.toBeInTheDocument()
    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByText(productParams.name)).toBeInTheDocument()
    expect(screen.getByText(productParams.description)).toBeInTheDocument()
  })

  it('Should render error on UnexpectedError', async () => {
    listCategories.mockRejectedValueOnce(new UnexpectedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByText(new UnexpectedError().message)).toBeInTheDocument()
  })

  it('Should logout on UnauthorizedError', async () => {
    listCategories.mockRejectedValueOnce(new UnauthorizedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(window.location.pathname).toBe('/login')
  })

  it('Should call listCategories on reload', async () => {
    listCategories.mockRejectedValueOnce(new UnexpectedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))
    fireEvent.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(listCategories).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByRole('list'))
  })

  it('Should add product on cart', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('list'))
    fireEvent.click(screen.getByTestId('addToCartButton'))

    expect(addToCart).toHaveBeenCalledWith(productParams)
    expect(addToCart).toHaveBeenCalledTimes(1)
  })
})
