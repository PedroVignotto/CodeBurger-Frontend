import { accountParams, addressParams } from '@/tests/mocks'
import { AccountContext } from '@/application/contexts'
import { Profile } from '@/application/pages'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Profile', () => {
  const { name } = accountParams
  const { id, surname, street, number, complement, district, zipCode } = addressParams

  const listAddresses: jest.Mock = jest.fn()
  const deleteAddress: jest.Mock = jest.fn()
  const setCurrentAccountMock: jest.Mock = jest.fn()
  const getCurrentAccountMock: jest.Mock = jest.fn()

  beforeAll(() => {
    listAddresses.mockResolvedValue([addressParams])
    getCurrentAccountMock.mockReturnValue({ name })
  })

  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
        <BrowserRouter>
          <Profile listAddresses={listAddresses} deleteAddress={deleteAddress} />
        </BrowserRouter>
      </AccountContext.Provider>
    )
  }

  it('Should load with correct initial state', async () => {
    makeSut()

    expect(screen.queryByRole('main')).not.toBeInTheDocument()
    await waitFor(() => screen.getByRole('main'))
  })

  it('Should call listAddresses', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('main'))

    expect(listAddresses).toHaveBeenCalledTimes(1)
  })

  it('Should render user name and addresses on success', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('main'))

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText(surname)).toBeInTheDocument()
    expect(screen.getByText(`${street}, ${number}, ${complement}`)).toBeInTheDocument()
    expect(screen.getByText(`${district}, ${zipCode}`)).toBeInTheDocument()
    expect(screen.getByText(`Olá, ${name}`)).toBeInTheDocument()
  })

  it('Should render error on UnexpectedError', async () => {
    listAddresses.mockRejectedValueOnce(new UnexpectedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(screen.getByText(new UnexpectedError().message)).toBeInTheDocument()
  })

  it('Should logout on UnauthorizedError', async () => {
    listAddresses.mockRejectedValueOnce(new UnauthorizedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(window.location.pathname).toBe('/login')
  })

  it('Should call listAddresses on reload', async () => {
    listAddresses.mockRejectedValueOnce(new UnexpectedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))
    fireEvent.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(listAddresses).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByRole('main'))
  })

  it('Should logout when exit button is clicked', async () => {
    makeSut()

    await waitFor(() => screen.getByText('Onde você quer receber seu pedido?'))
    fireEvent.click(screen.getByRole('button', { name: /sair/i }))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(window.location.pathname).toBe('/login')
  })

  it('Should call deleteAddress on reload', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('main'))
    fireEvent.click(screen.getByTestId('details'))
    fireEvent.click(screen.getByTestId('delete'))

    expect(deleteAddress).toHaveBeenCalledTimes(1)
    expect(deleteAddress).toHaveBeenCalledWith({ id })
    await waitFor(() => screen.getByRole('main'))
  })
})
