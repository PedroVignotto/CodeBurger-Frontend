import { DefaultButton, Input, Spinner } from '@/application/components'
import { AddressContext } from '@/application/pages/profile/contexts'
import { Address } from '@/domain/models'

import { Content } from './styles'

import Modal from 'react-modal'
import React, { useContext, useEffect, useState } from 'react'

type Props = { OpenModal: boolean, CloseModal: () => void, address: Address }

export const EditAddress: React.FC<Props> = ({ OpenModal, CloseModal, address }) => {
  const { validation } = useContext(AddressContext)
  const loading = false

  const [complement, setComplement] = useState('')
  const [complementError, setComplementError] = useState<string | undefined>('')
  const [number, setNumber] = useState('')
  const [numberError, setNumberError] = useState<string | undefined>('')
  const [surname, setSurname] = useState('')
  const [surnameError, setSurnameError] = useState<string | undefined>('')

  useEffect(() => setComplementError(validation.validate('complement', { complement })), [complement])
  useEffect(() => setNumberError(validation.validate('number', { number })), [number])
  useEffect(() => setSurnameError(validation.validate('surname', { surname })), [surname])

  return (
    <Modal isOpen={OpenModal} onRequestClose={CloseModal} ariaHideApp={false} overlayClassName='modal-overlay' className='modal-content'>
      <Content>
        <form data-testid="form">
          <section>
            <Input type="text" name="complement" placeholder="Complemento" value={address.complement} state={complementError} setState={setComplement} />
            <Input type="text" name="number" placeholder="Número" value={address.number} state={numberError} setState={setNumber} />
          </section>
          <Input type="text" name="surname" placeholder="Apelido" value={address.surname} state={surnameError} setState={setSurname} />
          <DefaultButton type="submit">{loading ? <Spinner /> : 'Salvar'}</DefaultButton>
        </form>
      </Content>
    </Modal>
  )
}
