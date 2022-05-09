import { RequiredValidation } from '@/application/validation'
import { RequiredFieldError } from '@/application/validation/errors'

import faker from 'faker'

describe('RequiredValidation', () => {
  let value: string
  let fieldName: string

  beforeAll(() => {
    value = faker.database.column()
    fieldName = faker.database.column()
  })

  it('Should return error if field is empty', () => {
    const sut = new RequiredValidation(fieldName)

    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return falsy if field is not empty', () => {
    const sut = new RequiredValidation(fieldName)

    const error = sut.validate(value)

    expect(error).toBeFalsy()
  })
})
