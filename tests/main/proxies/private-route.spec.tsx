import { PrivateRoute } from '@/main/proxies'
import { AccountContext } from '@/application/contexts'

import { render } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

describe('PrivateRoute', () => {
  const Home: React.FC = () => <div />
  const Login: React.FC = () => <div />

  const getCurrentAccountMock: jest.Mock = jest.fn()

  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: getCurrentAccountMock }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
          </Routes>
        </BrowserRouter>
      </AccountContext.Provider>
    )
  }

  it('Should redirect to /login if token is empty', () => {
    makeSut()

    expect(window.location.pathname).toBe('/login')
  })
})
