import { addressParams } from '@/tests/mocks'
import { Profile } from '@/application/pages'

import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Profile', () => {
  const listAddresses: jest.Mock = jest.fn()

  beforeAll(() => {
    listAddresses.mockResolvedValue([addressParams])
  })

  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <Profile listAddresses={listAddresses} />
      </BrowserRouter>
    )
  }

  it('Should load with correct initial state', async () => {
    makeSut()

    expect(screen.queryByRole('main')).not.toBeInTheDocument()
    expect(screen.queryByText('Onde você quer receber seu pedido?')).not.toBeInTheDocument()
    await waitFor(() => screen.queryByRole('main'))
  })

  it('Should call listAddresses', async () => {
    makeSut()

    await waitFor(() => screen.queryByRole('main'))

    expect(listAddresses).toHaveBeenCalledTimes(1)
  })
})
