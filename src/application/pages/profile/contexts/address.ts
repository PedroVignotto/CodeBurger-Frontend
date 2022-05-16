import { createContext } from 'react'

type Props = {
  handleDelete: (id: string) => Promise<void>
}

export const AddressContext = createContext<Props>(null as any)
