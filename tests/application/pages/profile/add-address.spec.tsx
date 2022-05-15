import { addressParams, populateField } from '@/tests/mocks'
import { AddAddress } from '@/application/pages'
import { Validator } from '@/application/validation'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('AddAddress', () => {
  const { zipCode, error } = addressParams

  const validator = mock<Validator>()

  beforeAll(() => {
    validator.validate.mockReturnValue('')
  })

  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <AddAddress validation={validator} />
      </BrowserRouter>
    )
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

    populateField('Informe seu CEP', zipCode)

    expect(screen.getByLabelText('Informe seu CEP')).toHaveProperty('title', error)
  })

  it('Should show valid input states if Validation succeeds', () => {
    makeSut()

    populateField('Informe seu CEP', zipCode)

    expect(screen.getByLabelText('Informe seu CEP')).toHaveProperty('title', '')
  })

  it('Should enable submit button if form-search is valid', () => {
    makeSut()

    populateField('Informe seu CEP', zipCode)

    expect(screen.getByRole('button', { name: /Buscar/i })).toBeEnabled()
  })

  it('Should show spinner on submit', async () => {
    makeSut()

    populateField('Informe seu CEP', zipCode)
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }))
    await waitFor(() => screen.getByTestId('form-search'))

    expect(screen.queryByRole('button', { name: /Buscar/i })).not.toBeInTheDocument()
  })
})
