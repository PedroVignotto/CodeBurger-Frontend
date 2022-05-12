import { categoryParams, productParams } from '@/tests/mocks'
import { Menu } from '@/application/pages'

import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Menu', () => {
  const listCategories: jest.Mock = jest.fn()

  const { id, name } = categoryParams

  beforeAll(() => {
    listCategories.mockResolvedValue([{ id, name, products: [productParams] }])
  })

  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <Menu listCategories={listCategories} />
      </BrowserRouter>
    )
  }

  it('Should load with correct initial state', async () => {
    listCategories.mockResolvedValueOnce([])

    makeSut()

    expect(screen.getAllByRole('list')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
    await waitFor(() => screen.getByRole('heading', { name: /cardápio/i }))
  })

  it('Should call listCategories', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('heading', { name: /cardápio/i }))

    expect(listCategories).toHaveBeenCalledTimes(1)
  })

  it('Should render categories on success', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('list'))

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
