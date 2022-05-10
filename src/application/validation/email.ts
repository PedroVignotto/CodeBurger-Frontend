import { FieldValidation } from '@/application/validation'
import { InvalidFieldError } from '@/application/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error | undefined {
    const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    if ((input as any)[this.field] && !validEmail.test(((input as any)[this.field]))) return new InvalidFieldError()
  }
}
