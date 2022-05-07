export interface Validator {
  validate: (fieldName: string, fieldValue: string) => string
}
