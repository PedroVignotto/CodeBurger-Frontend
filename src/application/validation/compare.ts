import { FieldValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

export class CompareValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
