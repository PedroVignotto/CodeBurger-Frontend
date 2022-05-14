import { accountParams, addressParams } from '@/tests/mocks'
import { AccountContext } from '@/application/contexts'
import { Profile } from '@/application/pages'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Profile', () => {
  const { name } = accountParams
  const { surname, street, number, complement, district, zipCode } = addressParams

  const listAddresses: jest.Mock = jest.fn()
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
          <Profile listAddresses={listAddresses} />
        </BrowserRouter>
      </AccountContext.Provider>
    )
  }

  it('Should load with correct initial state', async () => {
    makeSut()

    expect(screen.queryByRole('main')).not.toBeInTheDocument()
    expect(screen.queryByText('Onde você quer receber seu pedido?')).not.toBeInTheDocument()
    await waitFor(() => screen.getByRole('main'))
  })

  it('Should call listAddresses', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('main'))

    expect(listAddresses).toHaveBeenCalledTimes(1)
  })

  it('Should render user name and addresses on success', async () => {
    makeSut()

    await waitFor(() => screen.getByText('Onde você quer receber seu pedido?'))

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
})
