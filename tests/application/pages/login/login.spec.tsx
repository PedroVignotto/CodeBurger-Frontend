import { accountParams, populateField } from '@/tests/mocks'
import { Login } from '@/application/pages'
import { Validator } from '@/application/validation'

import { fireEvent, render, screen } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('Login', () => {
  const { email, password, error } = accountParams

  const validator = mock<Validator>()
  const authentication: jest.Mock = jest.fn()

  const makeSut = (): void => { render(<Login validation={validator} authentication={authentication} />) }

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

    populateField('Email', email)

    expect(validator.validate).toHaveBeenCalledWith('email', email)
  })

  it('Should call validation with correct password', () => {
    makeSut()

    populateField('Senha', password)

    expect(validator.validate).toHaveBeenCalledWith('password', password)
  })

  it('Should show email error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    populateField('Email', email)

    expect(screen.getByLabelText('Email')).toHaveProperty('title', error)
  })

  it('Should show password error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    populateField('Senha', password)

    expect(screen.getByLabelText('Senha')).toHaveProperty('title', error)
  })

  it('Should show valid email state if Validation succeeds', () => {
    makeSut()

    populateField('Email', email)

    expect(screen.getByLabelText('Email')).toHaveProperty('title', '')
  })

  it('Should show valid password state if Validation succeeds', () => {
    makeSut()

    populateField('Senha', password)

    expect(screen.getByLabelText('Senha')).toHaveProperty('title', '')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()

    populateField('Email', email)
    populateField('Senha', password)

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('Should show spinner on submit', async () => {
    makeSut()

    populateField('Email', email)
    populateField('Senha', password)
    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument()
  })

  it('Should call Authentication with correct values', async () => {
    makeSut()

    populateField('Email', email)
    populateField('Senha', password)
    fireEvent.click(screen.getByRole('button'))

    expect(authentication).toHaveBeenCalledWith({ email, password })
  })

  it('Should call Authentication only once', async () => {
    makeSut()

    populateField('Email', email)
    populateField('Senha', password)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))

    expect(authentication).toHaveBeenCalledTimes(1)
  })
})
