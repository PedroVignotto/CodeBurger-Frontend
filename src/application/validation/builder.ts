import { CompareValidation, EmailValidation, FieldValidation, RequiredValidation } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static of (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredValidation(this.fieldName))

    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))

    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareValidation(this.fieldName, fieldToCompare))

    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
