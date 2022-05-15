import { DefaultButton, Input, Spinner } from '@/application/components'
import { Validator } from '@/application/validation'
import { Default } from '@/application/layouts'
import { AddAddress, SearchAddress } from '@/domain/use-cases/address'

import { Container } from './styles'

import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'

type Props = { validation: Validator, searchAddress: SearchAddress, addAddress: AddAddress }

export const RegisterAddress: React.FC<Props> = ({ validation, searchAddress, addAddress }) => {
  const [formSearchVisible, setFormSearchVisible] = useState(true)
  const [loading, setLoading] = useState(false)

  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
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

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (loading || zipCodeError) return

      setLoading(true)

      const { district, street } = await searchAddress({ zipCode })

      setStreet(street)
      setDistrict(district)
      setFormSearchVisible(false)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    setLoading(true)

    await addAddress({ zipCode, surname, district, street, number: +number, complement })
  }

  return (
    <Default>
      <Container>
      {formSearchVisible
        ? <form data-testid="form-search" onSubmit={handleSearchSubmit}>
            <Input type="text" name="zipCode" placeholder="Informe seu CEP" state={zipCodeError} setState={setZipCode} />
            <DefaultButton type="submit" disabled={!!zipCodeError}>{loading ? <Spinner /> : 'Buscar'}</DefaultButton>
          </form>
        : <form data-testid="form-add" onSubmit={handleAddSubmit}>
            <div>
              <Input type="text" name="district" placeholder="Bairro" state={district} setState={setDistrict} readOnly />
              <Input type="text" name="zipCode" placeholder="CEP" state={zipCode} setState={setZipCode} readOnly />
            </div>
            <div>
              <Input type="text" name="street" placeholder="Rua" state={street} setState={setStreet} readOnly />
              <Input type="text" name="number" placeholder="Número" state={numberError} setState={setNumber} />
            </div>
            <Input type="text" name="complement" placeholder="Complemento" state={complementError} setState={setComplement} />
            <Input type="text" name="surname" placeholder="Apelido" state={surnameError} setState={setSurname} />
            <DefaultButton type="submit" disabled={!!numberError || !!complementError || !!surnameError}>{loading ? <Spinner /> : 'Adicionar'}</DefaultButton>
          </form>
      }
      </Container>
    </Default>
  )
}
