import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.of('email').required().email().build(),
    ...Builder.of('password').required().build()
  ])
