import { Login } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Login', () => {
  it('Should start with initial states', () => {
    render(<Login />)

    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
