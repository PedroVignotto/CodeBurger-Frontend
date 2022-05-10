import { CompareValidation, EmailValidation, RequiredValidation, ValidationBuilder as Builder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let fieldName: string
  let fieldToCompareName: string

  beforeAll(() => {
    fieldName = faker.database.column()
    fieldToCompareName = faker.database.column()
  })

  it('Should return a Required validation if required() is call', () => {
    const validations = Builder.of(fieldName).required().build()

    expect(validations).toStrictEqual([new RequiredValidation(fieldName)])
  })

  it('Should return a Email validation if email() is call', () => {
    const validators = Builder.of(fieldName).email().build()

    expect(validators).toStrictEqual([new EmailValidation(fieldName)])
  })

  test('Should return CompareFieldsValidation', () => {
    const validators = Builder.of(fieldName).sameAs(fieldToCompareName).build()
    expect(validators).toEqual([new CompareValidation(fieldName, fieldToCompareName)])
  })

  it('Should return a list of validations', () => {
    const validations = Builder.of(fieldName).required().email().build()

    expect(validations).toStrictEqual([new RequiredValidation(fieldName), new EmailValidation(fieldName)])
  })
})
