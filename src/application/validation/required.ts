import { FieldValidation } from '@/application/validation'
import { RequiredFieldError } from '@/application/validation/errors'

export class RequiredValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error | undefined {
    if (!value) return new RequiredFieldError()
  }
}
