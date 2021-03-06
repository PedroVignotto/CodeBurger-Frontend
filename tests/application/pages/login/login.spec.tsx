import { accountParams, populateField } from '@/tests/mocks'
import { Login } from '@/application/pages'
import { Validator } from '@/application/validation'
import { AccountContext } from '@/application/contexts'
import { InvalidCredentialsError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ToastContainer } from 'react-toastify'
import { mock } from 'jest-mock-extended'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Login', () => {
  const { email, password, name, accessToken, error } = accountParams

  const validator = mock<Validator>()
  const authentication: jest.Mock = jest.fn()
  const setCurrentAccountMock: jest.Mock = jest.fn()
  const getCurrentAccountMock: jest.Mock = jest.fn()

  const makeSut = (): void => {
    render(
    <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
      <BrowserRouter>
        <ToastContainer/>
        <Login validation={validator} authentication={authentication} />
      </BrowserRouter>
    </AccountContext.Provider>
    )
  }

  const populateFields = (): void => {
    populateField('Email', email)
    populateField('Senha', password)
  }

  const simulateSubmit = (): void => {
    populateFields()
    fireEvent.click(screen.getByRole('button'))
  }

  beforeAll(() => {
    validator.validate.mockReturnValue('')
    authentication.mockReturnValue({ name, accessToken })
  })

  it('Should load with correct initial state', () => {
    validator.validate.mockReturnValueOnce(error)

    makeSut()

    expect(screen.getByText('Entrar')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('Should call validation with correct values', () => {
    makeSut()

    populateFields()

    expect(validator.validate).toHaveBeenCalledWith('email', { email })
    expect(validator.validate).toHaveBeenCalledWith('password', { password })
  })

  it('Should show error if Validation fails', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error).mockReturnValueOnce(error)

    populateFields()

    expect(screen.getByLabelText('Email')).toHaveProperty('title', error)
    expect(screen.getByLabelText('Senha')).toHaveProperty('title', error)
  })

  it('Should show valid input states if Validation succeeds', () => {
    makeSut()

    populateField('Email', email)

    expect(screen.getByLabelText('Email')).toHaveProperty('title', '')
    expect(screen.getByLabelText('Senha')).toHaveProperty('title', '')
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

    expect(screen.queryByRole('button', { name: /Entrar/i })).not.toBeInTheDocument()
  })

  it('Should call Authentication with correct values', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(authentication).toHaveBeenCalledWith({ email, password })
  })

  it('Should call Authentication only once', async () => {
    makeSut()

    simulateSubmit()
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => screen.getByTestId('form'))

    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('Should not call Authentication if form is invalid', () => {
    makeSut()
    validator.validate.mockReturnValueOnce(error)

    populateFields()
    fireEvent.submit(screen.getByTestId('form'))

    expect(authentication).not.toHaveBeenCalled()
  })

  it('Should show alert error if Authentication fails', async () => {
    makeSut()
    authentication.mockRejectedValueOnce(new InvalidCredentialsError())

    simulateSubmit()

    expect(await screen.findByText(new InvalidCredentialsError().message)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Entrar/i })).toBeInTheDocument()
  })

  it('Should save account data on localstorage and go to home page', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith({ name, accessToken })
    expect(window.location.pathname).toBe('/')
  })

  it('Should go to signup page', async () => {
    makeSut()

    fireEvent.click(screen.getByRole('link'))
    await waitFor(() => screen.getByTestId('form'))

    expect(window.location.pathname).toBe('/signup')
  })
})
