import { Validator } from '@/application/validation'

import { createContext } from 'react'

type Props = {
  handleDelete: (id: string) => Promise<void>
  validation: Validator
}

export const AddressContext = createContext<Props>(null as any)
