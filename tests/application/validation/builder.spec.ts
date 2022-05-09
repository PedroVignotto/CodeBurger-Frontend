import { EmailValidation, RequiredValidation, ValidationBuilder as Builder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let fieldName: string

  beforeAll(() => {
    fieldName = faker.database.column()
  })

  it('Should return a Required validation if required() is call', () => {
    const validations = Builder.of(fieldName).required().build()

    expect(validations).toStrictEqual([new RequiredValidation(fieldName)])
  })

  it('Should return a Email validation if email() is call', () => {
    const validators = Builder.of(fieldName).email().build()

    expect(validators).toStrictEqual([new EmailValidation(fieldName)])
  })
})
