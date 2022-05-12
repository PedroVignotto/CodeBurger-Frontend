import { categoryParams, productParams } from '@/tests/mocks'
import { Menu } from '@/application/pages'
import { UnexpectedError } from '@/domain/errors'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    expect(screen.queryByRole('button', { name: /Tentar novamente/i })).not.toBeInTheDocument()
    await waitFor(() => screen.getByRole('heading', { name: /cardápio/i }))
  })

  it('Should call listCategories', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('list'))

    expect(listCategories).toHaveBeenCalledTimes(1)
  })

  it('Should render categories on success', async () => {
    makeSut()

    await waitFor(() => screen.getByRole('list'))

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.queryByRole('button', { name: /Tentar novamente/i })).not.toBeInTheDocument()
  })

  it('Should render error on UnexpectedError', async () => {
    listCategories.mockRejectedValueOnce(new UnexpectedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByText(/Algo deu errado. Tente novamente!/i)).toHaveTextContent(new UnexpectedError().message)
  })

  it('Should call listCategories on reload', async () => {
    listCategories.mockRejectedValueOnce(new UnexpectedError())

    makeSut()
    await waitFor(() => screen.getByRole('button', { name: /Tentar novamente/i }))
    fireEvent.click(screen.getByRole('button', { name: /Tentar novamente/i }))

    expect(listCategories).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByRole('list'))
  })
})
