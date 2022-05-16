import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'

export const makeRegisterAddressValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.of('zipCode').required().length(8).build(),
    ...Builder.of('password').required().build(),
    ...Builder.of('number').required().build(),
    ...Builder.of('surname').required().build()
  ])
