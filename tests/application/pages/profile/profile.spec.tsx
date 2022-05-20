import { accountParams, addressParams, populateField } from '@/tests/mocks'
import { AccountContext, CartContext } from '@/application/contexts'
import { Profile } from '@/application/pages'
import { Validator } from '@/application/validation'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('Profile', () => {
  const { name } = accountParams
  const { id, surname, street, number, complement, district, zipCode, error } = addressParams

  const validator = mock<Validator>()
  const listAddresses: jest.Mock = jest.fn()
  const deleteAddress: jest.Mock = jest.fn()
  const updateAddress: jest.Mock = jest.fn()
  const setCurrentAccountMock: jest.Mock = jest.fn()
  const getCurrentAccountMock: jest.Mock = jest.fn()

  beforeAll(() => {
    listAddresses.mockResolvedValue([{ id, surname, street, number, complement, district, zipCode, active: false }])
  })

  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
        <CartContext.Provider value={{ addToCart: jest.fn(), cart: [], updateQuantity: jest.fn() }}>
          <BrowserRouter>
            <ToastContainer/>
            <Profile listAddresses={listAddresses} deleteAddress={deleteAddress} validation={validator} updateAddress={updateAddress} />
          </BrowserRouter>
        </CartContext.Provider>
      </AccountContext.Provider>
    )
  }

  describe('list', () => {
    beforeAll(() => {
      getCurrentAccountMock.mockReturnValue({ name })
    })

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
      expect(await screen.findByText(surname)).toBeInTheDocument()
      expect(await screen.findByText(`${street}, ${number}, ${complement}`)).toBeInTheDocument()
      expect(await screen.findByText(`${district}, ${zipCode}`)).toBeInTheDocument()
      expect(await screen.findByText(`Olá, ${name}`)).toBeInTheDocument()
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

    it('Should go to add address page', async () => {
      makeSut()

      fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }))
      await waitFor(() => screen.getByRole('main'))

      expect(window.location.pathname).toBe('/address/register')
    })
  })

  describe('active', () => {
    it('Should call UpdateActiveAddress with correct values', async () => {
      makeSut()

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))

      expect(updateAddress).toHaveBeenCalledWith({ id, active: true })
      await waitFor(() => screen.getByRole('main'))
    })

    it('Should call UpdateActiveAddress only once', async () => {
      makeSut()

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))

      expect(updateAddress).toHaveBeenCalledTimes(1)
      await waitFor(() => screen.getByRole('main'))
    })

    it('Should not call UpdateActiveAddress if address have active true', async () => {
      listAddresses.mockResolvedValueOnce([{ ...addressParams, active: true }])
      makeSut()

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))

      expect(updateAddress).not.toHaveBeenCalled()
    })

    it('Should render error if UpdateActiveAddress return UnexpectedError', async () => {
      makeSut()
      updateAddress.mockRejectedValueOnce(new UnexpectedError())

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))
      await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

      expect(screen.getByText(new UnexpectedError().message)).toBeInTheDocument()
    })

    it('Should logout if UpdateActiveAddress return UnauthorizedError', async () => {
      makeSut()
      updateAddress.mockRejectedValueOnce(new UnauthorizedError())

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))
      fireEvent.click(screen.getByRole('main'))
      await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(window.location.pathname).toBe('/login')
    })
  })

  describe('delete', () => {
    it('Should call deleteAddress when delete button is clicked', async () => {
      makeSut()

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByTestId('details'))
      fireEvent.click(screen.getByTestId('delete'))

      expect(deleteAddress).toHaveBeenCalledTimes(1)
      expect(deleteAddress).toHaveBeenCalledWith({ id })
      await waitFor(() => screen.getByRole('main'))
    })

    it('Should call deleteAddress only once', async () => {
      makeSut()

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByTestId('details'))
      fireEvent.click(screen.getByTestId('delete'))
      fireEvent.click(screen.getByTestId('delete'))

      expect(deleteAddress).toHaveBeenCalledTimes(1)
      expect(deleteAddress).toHaveBeenCalledWith({ id })
      await waitFor(() => screen.getByRole('main'))
    })

    it('Should show alert error if deleteAddress fails', async () => {
      makeSut()
      deleteAddress.mockRejectedValueOnce(new UnexpectedError())

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByTestId('details'))
      fireEvent.click(screen.getByTestId('delete'))

      expect(await screen.findByText(new UnexpectedError().message)).toBeInTheDocument()
    })

    it('Should logout if deleteAddress return UnauthorizedError', async () => {
      makeSut()
      deleteAddress.mockRejectedValueOnce(new UnauthorizedError())

      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByTestId('details'))
      fireEvent.click(screen.getByTestId('delete'))
      await waitFor(async () => await screen.findByText(new UnauthorizedError().message))

      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(window.location.pathname).toBe('/login')
    })
  })

  describe('edit', () => {
    beforeAll(() => {
      validator.validate.mockReturnValue('')
    })

    const openEditModal = async (): Promise<void> => {
      await waitFor(() => screen.getByRole('main'))
      fireEvent.click(screen.getByTestId('details'))
      fireEvent.click(screen.getByTestId('edit'))
    }

    const populateFields = (): void => {
      populateField('Apelido', surname)
      populateField('Complemento', complement)
      populateField('Número', number.toString())
    }

    const simulateSubmit = (): void => {
      populateFields()
      fireEvent.click(screen.getByRole('button', { name: /Salvar/i }))
    }

    it('Should open edit address modal when edit button is clicked', async () => {
      makeSut()

      await openEditModal()

      expect(screen.getByTestId('form')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument()
    })

    it('Should call validation with correct values when edit button is clicked', async () => {
      makeSut()

      await openEditModal()
      populateFields()

      expect(validator.validate).toHaveBeenCalledWith('surname', { surname })
      expect(validator.validate).toHaveBeenCalledWith('number', { number })
    })

    it('Should show error if Validation fails', async () => {
      makeSut()
      validator.validate.mockReturnValueOnce(error).mockReturnValueOnce(error)

      await openEditModal()
      populateFields()

      expect(screen.getByLabelText('Apelido')).toHaveProperty('title', error)
      expect(screen.getByLabelText('Número')).toHaveProperty('title', error)
      expect(screen.getByRole('button', { name: /Salvar/i })).toBeDisabled()
    })

    it('Should show valid input states if Validation succeeds', async () => {
      makeSut()
      validator.validate.mockReturnValueOnce('').mockReturnValueOnce('')

      await openEditModal()
      populateFields()

      expect(screen.getByLabelText('Apelido')).toHaveProperty('title', '')
      expect(screen.getByLabelText('Número')).toHaveProperty('title', '')
    })

    it('Should enable submit button if form is valid', async () => {
      makeSut()

      await openEditModal()
      populateFields()

      expect(screen.getByRole('button', { name: /Salvar/i })).toBeEnabled()
    })

    it('Should show spinner on submit', async () => {
      makeSut()

      await openEditModal()
      simulateSubmit()
      await waitFor(() => screen.getByTestId('form'))

      expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument()
    })

    it('Should call UpdateAddress with correct values', async () => {
      makeSut()

      await openEditModal()
      simulateSubmit()
      await waitFor(() => screen.getByTestId('form'))

      expect(updateAddress).toHaveBeenCalledWith({ id, surname, number, complement })
    })

    it('Should not call UpdateAddress if form is invalid', async () => {
      makeSut()
      validator.validate.mockReturnValueOnce(error)

      await openEditModal()
      populateFields()
      fireEvent.submit(screen.getByTestId('form'))

      expect(updateAddress).not.toHaveBeenCalled()
    })

    it('Should show alert error if UpdateAddress fails', async () => {
      makeSut()
      updateAddress.mockRejectedValueOnce(new UnexpectedError())

      await openEditModal()
      simulateSubmit()

      expect(await screen.findByText(new UnexpectedError().message)).toBeInTheDocument()
      expect(screen.getByTestId('form')).toBeInTheDocument()
    })

    it('Should logout if updateAddress return UnauthorizedError', async () => {
      makeSut()
      updateAddress.mockRejectedValueOnce(new UnauthorizedError())

      await openEditModal()
      simulateSubmit()
      await waitFor(async () => await screen.findByText(new UnauthorizedError().message))

      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(window.location.pathname).toBe('/login')
    })
  })
})
