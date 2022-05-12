import { Menu } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Menu', () => {
  const listCategories: jest.Mock = jest.fn()

  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <Menu listCategories={listCategories} />
      </BrowserRouter>
    )
  }

  it('Should load with correct initial state', () => {
    makeSut()

    expect(screen.getAllByRole('list')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
  })

  it('Should call listCategories', () => {
    makeSut()

    expect(listCategories).toHaveBeenCalledTimes(1)
  })
})
