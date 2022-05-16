import { DefaultButton, Input, Spinner } from '@/application/components'

import { Content } from './styles'

import Modal from 'react-modal'
import React from 'react'

type Props = { OpenModal: boolean, CloseModal: () => void }

export const EditAddress: React.FC<Props> = ({ OpenModal, CloseModal }) => {
  const loading = false

  return (
    <Modal isOpen={OpenModal} onRequestClose={CloseModal} ariaHideApp={false} overlayClassName='modal-overlay' className='modal-content'>
      <Content>
        <form data-testid="form">
          <section>
            <Input type="text" name="complement" placeholder="Complemento" value={'any_complement'} setState={''} />
            <Input type="text" name="number" placeholder="Número" value={'123'} setState={''} />
          </section>
          <Input type="text" name="surname" placeholder="Apelido" value={'Casa'} setState={''} />
          <DefaultButton type="submit">{loading ? <Spinner /> : 'Salvar'}</DefaultButton>
        </form>
      </Content>
    </Modal>
  )
}
