import { Menu } from '@/application/pages'

import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

describe('Menu', () => {
  const makeSut = (): void => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    )
  }

  it('Should load with correct initial state', () => {
    makeSut()

    expect(screen.getAllByRole('list')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
  })
})
