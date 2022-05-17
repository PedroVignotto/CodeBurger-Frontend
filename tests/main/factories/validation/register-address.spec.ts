import { makeRegisterAddressValidation } from '@/main/factories/application/validation'
import { LengthValidation, RequiredValidation, ValidationComposite } from '@/application/validation'

describe('RegisterAddressValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeRegisterAddressValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredValidation('zipCode'),
      new LengthValidation('zipCode', 8),
      new RequiredValidation('number'),
      new RequiredValidation('surname')
    ]))
  })
})
