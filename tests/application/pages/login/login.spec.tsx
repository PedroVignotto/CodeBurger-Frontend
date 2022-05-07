import { Login } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Login', () => {
  it('Should not render spinner on start', () => {
    render(<Login />)

    expect(screen.getByText('Login')).toBeTruthy()
  })
})
