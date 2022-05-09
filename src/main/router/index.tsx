import { GlobalStyle } from '@/application/styles'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import React from 'react'

type Props = {
  MakeLogin: React.FC
}

export const Router: React.FC<Props> = ({ MakeLogin }) => {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
