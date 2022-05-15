import { addressParams, populateField } from '@/tests/mocks'
import { AddAddress } from '@/application/pages'
import { Validator } from '@/application/validation'
import { UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ToastContainer } from 'react-toastify'
import { mock } from 'jest-mock-extended'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('AddAddress', () => {
  const { zipCode, district, street, error } = addressParams

  const validator = mock<Validator>()
  const searchAddress: jest.Mock = jest.fn()

  beforeAll(() => {
    validator.validate.mockReturnValue('')
    searchAddress.mockResolvedValue({ district, street })
  })

  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <ToastContainer/>
        <AddAddress validation={validator} searchAddress={searchAddress} />
      </BrowserRouter>
    )
  }

  const populateSearchFormFields = (): void => populateField('Informe seu CEP', zipCode)

  const simulateSearchFormSubmit = (): void => {
    populateSearchFormFields()
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }))
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
    expect(validator.validate).toHaveBeenCalledWith('complement', { complement: '' })
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

    simulateSearchFormSubmit()
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
    expect(screen.getByLabelText('Bairro')).toHaveProperty('title', district)
    expect(screen.getByLabelText('CEP')).toHaveProperty('title', zipCode)
    expect(screen.getByLabelText('Rua')).toHaveProperty('title', street)
  })
})
