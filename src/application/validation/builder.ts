import { FieldValidation, RequiredValidation } from '@/application/validation'

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

  build (): FieldValidation[] {
    return this.validations
  }
}
