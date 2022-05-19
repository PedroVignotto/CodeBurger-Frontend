import { addressParams, populateField } from '@/tests/mocks'
import { RegisterAddress } from '@/application/pages'
import { CartContext } from '@/application/contexts'
import { Validator } from '@/application/validation'
import { UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ToastContainer } from 'react-toastify'
import { mock } from 'jest-mock-extended'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: () => (jest.fn()) }))

describe('RegisterAddress', () => {
  const { zipCode, district, street, surname, number, complement, error } = addressParams

  const validator = mock<Validator>()
  const searchAddress: jest.Mock = jest.fn()
  const addAddress: jest.Mock = jest.fn()

  beforeAll(() => {
    validator.validate.mockReturnValue('')
    searchAddress.mockResolvedValue({ district, street })
  })

  const makeSut = (): void => {
    render(
      <CartContext.Provider value={{ addToCart: jest.fn(), cart: [] }}>
        <BrowserRouter>
          <ToastContainer/>
          <RegisterAddress validation={validator} searchAddress={searchAddress} addAddress={addAddress} />
        </BrowserRouter>
      </CartContext.Provider>
    )
  }

  const populateSearchFormFields = (): void => populateField('Informe seu CEP', zipCode)

  const populateAddFormFields = async (): Promise<void> => {
    simulateSearchFormSubmit()
    await waitFor(() => screen.getByTestId('form-add'))
    populateField('Número', number.toString())
    populateField('Complemento', complement)
    populateField('Apelido', surname)
  }

  const simulateSearchFormSubmit = (): void => {
    populateSearchFormFields()
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }))
  }

  const simulateAddFormSubmit = async (): Promise<void> => {
    await populateAddFormFields()
    fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }))
  }

  it('Should load with correct initial state', async () => {
    validator.validate.mockReturnValueOnce(error)

    makeSut()

    expect(screen.getByTestId('form-search')).toBeInTheDocument()
    expect(screen.queryByTestId('form-add')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeDisabled()
  })

  it('Should call validation with correct values', () => {
    makeSut()

    expect(validator.validate).toHaveBeenCalledWith('zipCode', { zipCode: '' })
    expect(validator.validate).toHaveBeenCalledWith('number', { number: '' })
    expect(validator.validate).toHaveBeenCalledWith('surname', { surname: '' })
  })

  it('Should show error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    populateSearchFormFields()

    expect(screen.getByLabelText('Informe seu CEP')).toHaveProperty('title', error)
  })

  it('Should show valid input states if Validation succeeds', () => {
    makeSut()

    populateSearchFormFields()

    expect(screen.getByLabelText('Informe seu CEP')).toHaveProperty('title', '')
  })

  it('Should enable submit button if form-search is valid', () => {
    makeSut()

    populateSearchFormFields()

    expect(screen.getByRole('button', { name: /Buscar/i })).toBeEnabled()
  })

  it('Should show spinner on submit', async () => {
    makeSut()

    simulateSearchFormSubmit()
    await waitFor(() => screen.getByTestId('form-search'))

    expect(screen.queryByRole('button', { name: /Buscar/i })).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('form-add'))
  })

  it('Should call SearchAddress with correct values', async () => {
    makeSut()

    simulateSearchFormSubmit()
    await waitFor(() => screen.getByTestId('form-search'))

    expect(searchAddress).toHaveBeenCalledWith({ zipCode })
    await waitFor(() => screen.getByTestId('form-add'))
  })

  it('Should not call SearchAddress if form is invalid', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    populateSearchFormFields()
    fireEvent.submit(screen.getByTestId('form-search'))

    expect(searchAddress).not.toHaveBeenCalled()
  })

  it('Should show alert error if SearchAddress fails', async () => {
    makeSut()
    searchAddress.mockRejectedValueOnce(new UnexpectedError())

    simulateSearchFormSubmit()

    expect(await screen.findByText(new UnexpectedError().message)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Buscar/i })).toBeInTheDocument()
  })

  it('Should show form-add if SearchAddress succeeds', async () => {
    makeSut()

    simulateSearchFormSubmit()
    await waitFor(() => screen.getByTestId('form-add'))

    expect(screen.getByTestId('form-add')).toBeInTheDocument()
    expect(screen.queryByTestId('form-search')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Bairro')).toHaveProperty('value', district)
    expect(screen.getByLabelText('CEP')).toHaveProperty('value', zipCode)
    expect(screen.getByLabelText('Rua')).toHaveProperty('value', street)
  })

  it('Should enable submit button if form-add is valid', async () => {
    makeSut()

    await populateAddFormFields()

    expect(screen.getByRole('button', { name: /Adicionar/i })).toBeEnabled()
  })

  it('Should show spinner on form-add submit', async () => {
    makeSut()

    await simulateAddFormSubmit()
    await waitFor(() => screen.getByTestId('form-add'))

    expect(screen.queryByRole('button', { name: /Adicionar/i })).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('form-add'))
  })

  it('Should call AddAddress with correct values', async () => {
    makeSut()

    await simulateAddFormSubmit()
    await waitFor(() => screen.getByTestId('form-add'))

    expect(addAddress).toHaveBeenCalledWith({ zipCode, district, street, surname, number, complement })
    await waitFor(() => screen.getByTestId('form-add'))
  })

  it('Should not call AddAddress if form is invalid', async () => {
    makeSut()
    validator.validate.mockReturnValueOnce('').mockReturnValueOnce(error)

    await populateAddFormFields()
    fireEvent.submit(screen.getByTestId('form-add'))

    expect(addAddress).not.toHaveBeenCalled()
  })

  it('Should show alert error if AddAddress fails', async () => {
    makeSut()
    addAddress.mockRejectedValueOnce(new UnexpectedError())

    await simulateAddFormSubmit()

    expect(await screen.findByText(new UnexpectedError().message)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Adicionar/i })).toBeInTheDocument()
  })
})
