import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'

export const makeRegisterAddressValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.of('zipCode').required().build(),
    ...Builder.of('password').required().build(),
    ...Builder.of('number').required().build(),
    ...Builder.of('complement').required().build(),
    ...Builder.of('surname').required().build()
  ])
