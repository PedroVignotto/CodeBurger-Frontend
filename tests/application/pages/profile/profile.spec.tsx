import { Profile } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Profile', () => {
  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
  }

  it('Should load with correct initial state', async () => {
    makeSut()

    expect(screen.queryByRole('main')).not.toBeInTheDocument()
    expect(screen.queryByText('Onde você quer receber seu pedido?')).not.toBeInTheDocument()
  })
})
