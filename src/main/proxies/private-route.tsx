import { AccountContext } from '@/application/contexts'

import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'

export type Props = { children: JSX.Element }

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { getCurrentAccount } = useContext(AccountContext)

  return getCurrentAccount()?.accessToken ? children : <Navigate to={'/login'} replace />
}
