import { DefaultButton, Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'
import { Default } from '@/application/layouts'

import { Container } from './styles'

import React, { useEffect, useState } from 'react'

type Props = { validation: Validator }

export const AddAddress: React.FC<Props> = ({ validation }) => {
  const [formSearchVisible] = useState(true)
  const loading = false

  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState<string | undefined>('')
  const [number, setNumber] = useState('')
  const [numberError, setNumberError] = useState<string | undefined>('')
  const [complement, setComplement] = useState('')
  const [complementError, setComplementError] = useState<string | undefined>('')
  const [surname, setSurname] = useState('')
  const [surnameError, setSurnameError] = useState<string | undefined>('')

  useEffect(() => setZipCodeError(validation.validate('zipCode', { zipCode })), [zipCode])
  useEffect(() => setNumberError(validation.validate('number', { number })), [number])
  useEffect(() => setComplementError(validation.validate('complement', { complement })), [complement])
  useEffect(() => setSurnameError(validation.validate('surname', { surname })), [surname])

  return (
    <Default>
      <Container>
      {formSearchVisible
        ? <form data-testid="form-search">
            <Input type="text" name="zipCode" placeholder="Informe seu CEP" state={zipCodeError} setState={setZipCode} />
            <DefaultButton type="submit" disabled={!!zipCodeError}>{loading ? <Spinner /> : 'Buscar'}</DefaultButton>
          </form>
        : <form data-testid="form-add">
            <div>
              <Input type="text" name="district" placeholder="Bairro" state={''} setState={''} readOnly />
              <Input type="text" name="zipCode" placeholder="CEP" state={''} setState={''} readOnly />
            </div>
            <div>
              <Input type="text" name="street" placeholder="Rua" state={''} setState={''} readOnly />
              <Input type="text" name="number" placeholder="Número" state={numberError} setState={setNumber} />
            </div>
            <Input type="text" name="complement" placeholder="Complemento" state={complementError} setState={setComplement} />
            <Input type="text" name="surname" placeholder="Apelido" state={surnameError} setState={setSurname} />
            <DefaultButton type="submit">{loading ? <Spinner /> : 'Adicionar'}</DefaultButton>
          </form>
      }
      </Container>
    </Default>
  )
}
