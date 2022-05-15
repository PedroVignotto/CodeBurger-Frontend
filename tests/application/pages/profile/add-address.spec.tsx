import { AddAddress } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('AddAddress', () => {
  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <AddAddress />
      </BrowserRouter>
    )
  }

  it('Should load with correct initial state', async () => {
    makeSut()

    expect(screen.getByTestId('form-search')).toBeInTheDocument()
    expect(screen.queryByTestId('form-add')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeDisabled()
  })
})
