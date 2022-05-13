import { AccountContext } from '@/application/contexts'

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(AccountContext)

  return (): void => {
    setCurrentAccount(undefined as any)
    navigate('/login')
  }
}
