import { makeSignUpValidation } from '@/main/factories/application/validation'
import { CompareValidation, EmailValidation, RequiredValidation, ValidationComposite } from '@/application/validation'

describe('SignUpValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredValidation('name'),
      new RequiredValidation('email'),
      new EmailValidation('email'),
      new RequiredValidation('password'),
      new RequiredValidation('passwordConfirmation'),
      new CompareValidation('passwordConfirmation', 'password')
    ]))
  })
})
