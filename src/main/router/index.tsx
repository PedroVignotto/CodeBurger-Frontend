import { setCurrentAccountAdapter } from '@/main/adapters'
import { GlobalStyle } from '@/application/styles'
import { AccountContext } from '@/application/contexts'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'

type Props = {
  MakeLogin: React.FC
}

export const Router: React.FC<Props> = ({ MakeLogin }) => {
  return (
    <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <ToastContainer autoClose={3000} theme="colored" />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
        </Routes>
      </BrowserRouter>
    </AccountContext.Provider>
  )
}
