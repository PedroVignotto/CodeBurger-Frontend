export class FieldInUseError extends Error {
  constructor (fieldName: string) {
    super(`O ${fieldName} já está em uso!`)
    this.name = 'FieldInUseError'
  }
}
