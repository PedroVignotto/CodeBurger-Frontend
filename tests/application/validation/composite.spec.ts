import { FieldValidation, ValidationComposite } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('ValidationComposite', () => {
  let sut: ValidationComposite

  let fieldName: string
  let fieldValue: string
  let error1: Error
  let error2: Error
  let validators: FieldValidation[]

  let validator1: MockProxy<FieldValidation>
  let validator2: MockProxy<FieldValidation>

  beforeAll(() => {
    fieldName = faker.database.column()
    fieldValue = faker.random.words()
    error1 = new Error(faker.random.word())
    error2 = new Error(faker.random.word())

    validator1 = mock<FieldValidation>({ field: fieldName })
    validator2 = mock<FieldValidation>({ field: fieldName })

    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)

    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = ValidationComposite.build(validators)
  })

  it('Should return undefined if all Validators return undefined', () => {
    const error = sut.validate(fieldName, fieldValue)

    expect(error).toBeUndefined()
  })

  it('Should return the first error if any Validator fails', () => {
    validator1.validate.mockReturnValueOnce(error1)
    validator2.validate.mockReturnValueOnce(error2)

    const error = sut.validate(fieldName, fieldValue)

    expect(error).toEqual(error1.message)
  })
})
