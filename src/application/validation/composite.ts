import { FieldValidation, Validator } from '@/application/validation'

export class ValidationComposite implements Validator {
  private constructor (private readonly validators: FieldValidation[]) {}

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, fieldValue: string): string | undefined {
    const validators = this.validators.filter(v => v.field === fieldName)

    for (const validator of validators) {
      const error = validator.validate(fieldValue)

      if (error) return error.message
    }
  }
}
