import { DefaultButton, Input, Spinner } from '@/application/components'
import { AddressContext } from '@/application/pages/profile/contexts'
import { Address } from '@/domain/models'

import { Content } from './styles'

import { toast } from 'react-toastify'
import Modal from 'react-modal'
import React, { useContext, useEffect, useState } from 'react'

type Props = { OpenModal: boolean, CloseModal: () => void, address: Address, setHandleOpenDetails: React.Dispatch<React.SetStateAction<boolean>> }

export const EditAddress: React.FC<Props> = ({ OpenModal, CloseModal, address, setHandleOpenDetails }) => {
  const { validation, updateAddress, setReload, reload } = useContext(AddressContext)
  const [loading, setLoading] = useState(false)

  const [complement, setComplement] = useState(address.complement)
  const [number, setNumber] = useState(address.number)
  const [numberError, setNumberError] = useState<string | undefined>('')
  const [surname, setSurname] = useState(address.surname)
  const [surnameError, setSurnameError] = useState<string | undefined>('')

  useEffect(() => setNumberError(validation.validate('number', { number })), [number])
  useEffect(() => setSurnameError(validation.validate('surname', { surname })), [surname])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || numberError || surnameError) return

      setLoading(true)

      await updateAddress({ id: address.id, complement, number: +number, surname })

      setHandleOpenDetails(false)
      setReload(!reload)
      CloseModal()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={OpenModal} onRequestClose={CloseModal} ariaHideApp={false} overlayClassName='modal-overlay' className='modal-content'>
      <Content>
        <form data-testid="form" onSubmit={handleSubmit}>
          <section>
            <Input type="text" name="complement" placeholder="Complemento" value={complement} setState={setComplement} />
            <Input type="text" name="number" placeholder="Número" value={number} state={numberError} setState={setNumber} />
          </section>
          <Input type="text" name="surname" placeholder="Apelido" value={surname} state={surnameError} setState={setSurname} />
          <DefaultButton type="submit" disabled={!!numberError || !!surnameError}>{loading ? <Spinner /> : 'Salvar'}</DefaultButton>
        </form>
      </Content>
    </Modal>
  )
}
