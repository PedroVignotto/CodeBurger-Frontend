import { EmailValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

import faker from 'faker'

describe('EmailValidation', () => {
  let validEmail: string
  let invalidEmail: string
  let fieldName: string

  beforeAll(() => {
    validEmail = faker.internet.email()
    invalidEmail = faker.random.word()
    fieldName = faker.database.column()
  })

  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation(fieldName)

    const error = sut.validate({ [fieldName]: invalidEmail })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if email is valid', () => {
    const sut = new EmailValidation(fieldName)

    const error = sut.validate({ [fieldName]: validEmail })

    expect(error).toBeFalsy()
  })

  it('Should return falsy if email is empty', () => {
    const sut = new EmailValidation(fieldName)

    const error = sut.validate({ [fieldName]: undefined })

    expect(error).toBeFalsy()
  })
})
