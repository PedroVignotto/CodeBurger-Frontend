import { Validator } from '@/application/validation'
import { UpdateAddress } from '@/domain/use-cases/address'

import { createContext } from 'react'

type Props = {
  handleDelete: (id: string) => Promise<void>
  validation: Validator
  updateAddress: UpdateAddress
  setReload: (value: React.SetStateAction<boolean>) => void
  reload: boolean
}

export const AddressContext = createContext<Props>(null as any)