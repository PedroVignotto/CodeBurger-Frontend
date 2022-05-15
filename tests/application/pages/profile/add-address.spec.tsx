import { addressParams, populateField } from '@/tests/mocks'
import { AddAddress } from '@/application/pages'
import { Validator } from '@/application/validation'

import { render, screen } from '@testing-library/react'
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
})
