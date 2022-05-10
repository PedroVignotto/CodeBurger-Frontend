import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'

export const makeSignUpValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.of('name').required().build(),
    ...Builder.of('email').required().email().build(),
    ...Builder.of('password').required().build(),
    ...Builder.of('passwordConfirmation').required().sameAs('password').build()
  ])
