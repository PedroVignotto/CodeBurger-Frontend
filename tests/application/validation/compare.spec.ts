import { CompareValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

import faker from 'faker'

describe('CompareValidation', () => {
  let field: string
  let fieldToCompare: string
  let fieldToCompareValid: string
  let fieldToCompareInvalid: string
  let value: string

  beforeAll(() => {
    value = faker.random.words(3)
    fieldToCompareValid = value
    fieldToCompareInvalid = faker.random.words(4)
    field = faker.random.words(1)
    fieldToCompare = faker.random.words(2)
  })

  it('Should return InvalidFieldError if fields are not equal', () => {
    const sut = new CompareValidation(field, fieldToCompare)

    const error = sut.validate(({ [field]: value, [fieldToCompare]: fieldToCompareInvalid }))

    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return undefined if fields are equal', () => {
    const sut = new CompareValidation(field, fieldToCompare)

    const error = sut.validate(({ [field]: value, [fieldToCompare]: fieldToCompareValid }))

    expect(error).toBeUndefined()
  })
})
