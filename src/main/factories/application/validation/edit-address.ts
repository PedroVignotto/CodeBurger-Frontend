import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'

export const makeEditAddressValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.of('complement').required().build(),
    ...Builder.of('number').required().build(),
    ...Builder.of('surname').required().build()
  ])
