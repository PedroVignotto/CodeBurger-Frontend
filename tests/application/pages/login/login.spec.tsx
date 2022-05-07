import { accountParams } from '@/../tests/mocks'
import { Login } from '@/application/pages'
import { Validator } from '@/application/validation'

import { fireEvent, render, screen } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import React from 'react'

describe('Login', () => {
  const { email } = accountParams

  const validator = mock<Validator>()

  beforeEach(() => {
    render(<Login validation={validator} />)
  })

  it('Should start with initial states', () => {
    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('Should call validation with correct email', () => {
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: email } })

    expect(validator.validate).toHaveBeenCalledWith({ email })
    expect(validator.validate).toHaveBeenCalledTimes(2)
  })
})
