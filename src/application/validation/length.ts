import { FieldValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

export class LengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly length: number) {}

  validate (input: object): Error | undefined {
    if ((input as any)[this.field] && (input as any)[this.field]?.length !== this.length) return new InvalidFieldError()
  }
}
