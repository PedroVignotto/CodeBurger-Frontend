import { accountParams, populateField } from '@/tests/mocks'
import { SignUp } from '@/application/pages'
import { Validator } from '@/application/validation'
import { AccountContext } from '@/application/contexts'
import { FieldInUseError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('SignUp', () => {
  const { name, email, password, passwordConfirmation, accessToken, error } = accountParams

  const validator = mock<Validator>()
  const addAccount: jest.Mock = jest.fn()
  const setCurrentAccountMock: jest.Mock = jest.fn()

  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <BrowserRouter>
          <ToastContainer/>
          <SignUp validation={validator} addAccount={addAccount} />
        </BrowserRouter>
      </AccountContext.Provider>
    )
  }

  const populateFields = (): void => {
    populateField('Nome', name)
    populateField('Email', email)
    populateField('Senha', password)
    populateField('Confirmar senha', passwordConfirmation)
  }

  const simulateSubmit = (): void => {
    populateFields()
    fireEvent.click(screen.getByRole('button'))
  }

  beforeAll(() => {
    validator.validate.mockReturnValue('')
    addAccount.mockReturnValue({ name, accessToken })
  })

  it('Should load with correct initial state', () => {
    validator.validate.mockReturnValueOnce(error)

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

  it('Should show valid input states if Validation succeeds', () => {
    makeSut()

    populateField('Email', email)

    expect(screen.getByLabelText('Nome')).toHaveProperty('title', '')
    expect(screen.getByLabelText('Email')).toHaveProperty('title', '')
    expect(screen.getByLabelText('Senha')).toHaveProperty('title', '')
    expect(screen.getByLabelText('Confirmar senha')).toHaveProperty('title', '')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()

    populateFields()

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('Should show spinner on submit', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(screen.queryByRole('button', { name: /Cadastre-se/i })).not.toBeInTheDocument()
  })

  it('Should call AddAccount with correct values', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
  })

  it('Should call AddAccount only once', async () => {
    makeSut()

    simulateSubmit()
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => screen.getByTestId('form'))

    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('Should not call AddAccount if form is invalid', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    populateFields()
    fireEvent.submit(screen.getByTestId('form'))

    expect(addAccount).not.toHaveBeenCalled()
  })

  it('Should show alert error if AddAccount fails', async () => {
    makeSut()
    addAccount.mockRejectedValueOnce(new FieldInUseError('email'))

    simulateSubmit()

    expect(await screen.findByText(new FieldInUseError('email').message)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Cadastre-se/i })).toBeInTheDocument()
  })

  it('Should save account data on localstorage and go to home page', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith({ name, accessToken })
    expect(window.location.pathname).toBe('/')
  })

  it('Should go to login page', async () => {
    makeSut()

    fireEvent.click(screen.getByRole('link'))
    await waitFor(() => screen.getByTestId('form'))

    expect(window.location.pathname).toBe('/login')
  })
})
