import { EmailValidation, RequiredValidation, ValidationComposite } from '@/application/validation'
import { makeLoginValidation } from '@/main/factories/application/validation'

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredValidation('email'),
      new EmailValidation('email'),
      new RequiredValidation('password')
    ]))
  })
})
