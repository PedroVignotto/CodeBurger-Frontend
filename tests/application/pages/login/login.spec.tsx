import { accountParams } from '@/../tests/mocks'
import { Login } from '@/application/pages'
import { Validator } from '@/application/validation'

import { fireEvent, render, screen } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('Login', () => {
  const { email, password, error } = accountParams

  const validator = mock<Validator>()

  const makeSut = (): void => { render(<Login validation={validator} />) }

  beforeAll(() => {
    validator.validate.mockReturnValue('')
  })

  it('Should start with initial states', () => {
    validator.validate.mockReturnValueOnce(error)

    makeSut()

    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('Should call validation with correct email', () => {
    makeSut()

    fireEvent.input(screen.getByLabelText('Email'), { target: { value: email } })

    expect(validator.validate).toHaveBeenCalledWith('email', email)
  })

  it('Should call validation with correct password', () => {
    makeSut()

    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: password } })

    expect(validator.validate).toHaveBeenCalledWith('password', password)
  })

  it('Should show email error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    fireEvent.input(screen.getByLabelText('Email'), { target: { value: email } })

    expect(screen.getByLabelText('Email')).toHaveProperty('title', error)
  })

  it('Should show password error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: password } })

    expect(screen.getByLabelText('Senha')).toHaveProperty('title', error)
  })

  it('Should show valid email state if Validation succeeds', () => {
    makeSut()

    fireEvent.input(screen.getByLabelText('Email'), { target: { value: email } })

    expect(screen.getByLabelText('Email')).toHaveProperty('title', '')
  })

  it('Should show valid password state if Validation succeeds', () => {
    makeSut()

    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: password } })

    expect(screen.getByLabelText('Senha')).toHaveProperty('title', '')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()

    fireEvent.input(screen.getByLabelText('Email'), { target: { value: email } })
    fireEvent.input(screen.getByLabelText('Senha'), { target: { value: password } })

    expect(screen.getByRole('button')).toBeEnabled()
  })
})
