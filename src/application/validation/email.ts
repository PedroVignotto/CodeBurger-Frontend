import { FieldValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
