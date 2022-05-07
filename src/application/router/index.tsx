import { GlobalStyle } from '@/application/styles'
import { Login } from '@/application/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

export const Router: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
