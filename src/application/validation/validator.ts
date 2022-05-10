export interface Validator {
  validate: (fieldName: string, input: object) => string | undefined
}
