import { accountParams, populateField } from '@/tests/mocks'
import { SignUp } from '@/application/pages'
import { Validator } from '@/application/validation'

import { render, screen } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('SignUp', () => {
  const { name, email, password, passwordConfirmation } = accountParams

  const validator = mock<Validator>()

  const makeSut = (): void => {
    render(<SignUp validation={validator} />)
  }

  const populateFields = (): void => {
    populateField('Nome', name)
    populateField('Email', email)
    populateField('Senha', password)
    populateField('Confirmar senha', passwordConfirmation)
  }

  it('Should load with correct initial state', () => {
    makeSut()

    expect(screen.getByText('Cadastre-se')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('Should call validation with correct values', () => {
    makeSut()

    populateFields()

    expect(validator.validate).toHaveBeenCalledWith('name', name)
    expect(validator.validate).toHaveBeenCalledWith('email', email)
    expect(validator.validate).toHaveBeenCalledWith('password', password)
    expect(validator.validate).toHaveBeenCalledWith('passwordConfirmation', passwordConfirmation)
  })
})
