import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { makeAddOrder } from '@/main/factories/domain/use-cases/order'
import { PrivateRoute } from '@/main/proxies'
import { GlobalStyle } from '@/application/styles'
import { AccountContext, CartProvider, OrderContext } from '@/application/contexts'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'

type Props = {
  Login: React.FC
  SignUp: React.FC
  Menu: React.FC
  Profile: React.FC
  RegisterAddress: React.FC
}

export const Router: React.FC<Props> = ({ Login, SignUp, Menu, Profile, RegisterAddress }) => {
  return (
    <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}>
      <OrderContext.Provider value={{ addOrder: makeAddOrder }}>
        <CartProvider>
          <ToastContainer autoClose={3000} theme="colored" />
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/address/register" element={<PrivateRoute><RegisterAddress /></PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </OrderContext.Provider>
    </AccountContext.Provider>
  )
}
