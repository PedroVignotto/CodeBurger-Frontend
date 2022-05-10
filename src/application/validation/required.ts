import { FieldValidation } from '@/application/validation'
import { RequiredFieldError } from '@/application/validation/errors'

export class RequiredValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error | undefined {
    if (!(input as any)[this.field]) return new RequiredFieldError()
  }
}
