import { Account } from '@/domain/models'

import { createContext } from 'react'

type Props = {
  setCurrentAccount: (account: Account) => void
  getCurrentAccount?: () => Account
}

export const AccountContext = createContext<Props>(null as any)
