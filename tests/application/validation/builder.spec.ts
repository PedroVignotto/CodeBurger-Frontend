import { RequiredValidation, ValidationBuilder as Builder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let fieldName: string

  beforeAll(() => {
    fieldName = faker.database.column()
  })

  it('Should return a Required validation if required() is call', () => {
    const validations = Builder.of(fieldName).required().build()

    expect(validations).toEqual([new RequiredValidation(fieldName)])
  })
})
