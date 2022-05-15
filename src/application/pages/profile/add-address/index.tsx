import { DefaultButton, Input, Spinner } from '@/application/components'
import { Default } from '@/application/layouts'

import { Container } from './styles'

import React from 'react'

export const AddAddress: React.FC = () => {
  const loading = false

  return (
    <Default>
      <Container>
      <form data-testid="form">
        <Input type="text" name="zipCode" placeholder="Informe seu CEP" state={''} setState={''} />
        <DefaultButton type="submit" >{loading ? <Spinner /> : 'Buscar'}</DefaultButton>
      </form>
      <form data-testid="form">
        <div>
          <Input type="text" name="district" placeholder="Bairro" state={''} setState={''} readOnly />
          <Input type="text" name="zipCode" placeholder="CEP" state={''} setState={''} readOnly />
        </div>
        <div>
          <Input type="text" name="street" placeholder="Rua" state={''} setState={''} readOnly />
          <Input type="text" name="number_address" placeholder="Número" state={''} setState={''} />
        </div>
        <Input type="text" name="complement" placeholder="Complemento" state={''} setState={''} />
        <Input type="text" name="surname" placeholder="Apelido" state={''} setState={''} />
        <DefaultButton type="submit">{loading ? <Spinner /> : 'Adicionar'}</DefaultButton>
      </form>
      </Container>
    </Default>
  )
}