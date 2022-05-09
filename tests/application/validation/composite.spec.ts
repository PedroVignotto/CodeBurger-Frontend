import { FieldValidation, ValidationComposite } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('ValidationComposite', () => {
  let sut: ValidationComposite

  let fieldName: string
  let fieldValue: string

  let validators: FieldValidation[]

  let validator1: MockProxy<FieldValidation>
  let validator2: MockProxy<FieldValidation>

  beforeAll(() => {
    fieldName = faker.database.column()
    fieldValue = faker.random.words()

    validator1 = mock<FieldValidation>({ field: fieldName })
    validator2 = mock<FieldValidation>({ field: fieldName })

    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)

    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('Should return undefined if all Validators return undefined', () => {
    const error = sut.validate(fieldName, fieldValue)

    expect(error).toBeUndefined()
  })
})
