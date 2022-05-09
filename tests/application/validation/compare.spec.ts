import { CompareValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

import faker from 'faker'

describe('CompareValidation', () => {
  let field: string
  let valueToCompareInvalid: string
  let value: string

  beforeAll(() => {
    value = faker.random.words(1)
    valueToCompareInvalid = faker.random.words(2)
    field = faker.database.column()
  })

  it('Should return InvalidFieldError if fields are not equal', () => {
    const sut = new CompareValidation(field, valueToCompareInvalid)

    const error = sut.validate(value)

    expect(error).toEqual(new InvalidFieldError())
  })
})
