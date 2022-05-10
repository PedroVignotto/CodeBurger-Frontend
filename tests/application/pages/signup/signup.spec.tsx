import { SignUp } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'

describe('SignUp', () => {
  const makeSut = (): void => {
    render(<SignUp />)
  }

  it('Should load with correct initial state', () => {
    makeSut()

    expect(screen.getByText('Cadastre-se')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
