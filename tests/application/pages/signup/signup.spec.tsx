import { accountParams, populateField } from '@/tests/mocks'
import { SignUp } from '@/application/pages'
import { Validator } from '@/application/validation'

import { render, screen } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('SignUp', () => {
  const { name, email, password, passwordConfirmation, error } = accountParams

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

  it('Should show error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error).mockReturnValueOnce(error).mockReturnValueOnce(error).mockReturnValueOnce(error)

    populateFields()

    expect(screen.getByLabelText('Nome')).toHaveProperty('title', error)
    expect(screen.getByLabelText('Email')).toHaveProperty('title', error)
    expect(screen.getByLabelText('Senha')).toHaveProperty('title', error)
    expect(screen.getByLabelText('Confirmar senha')).toHaveProperty('title', error)
  })
})
