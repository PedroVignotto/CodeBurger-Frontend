import { InvalidFieldError } from '@/application/validation/errors'
import { LengthValidation } from '@/application/validation'

import faker from 'faker'

describe('LengthValidation', () => {
  let field: string
  let fieldName: string

  beforeAll(() => {
    field = faker.random.alpha({ count: 8 })
    fieldName = faker.database.column()
  })

  it('Should return error if value is invalid', () => {
    const sut = new LengthValidation(fieldName, 1)

    const error = sut.validate({ [fieldName]: field })

    expect(error).toEqual(new InvalidFieldError())
  })
})
