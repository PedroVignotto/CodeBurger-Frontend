export class FieldNotFoundError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} não encontrado`)
    this.name = 'FieldNotFoundError'
  }
}
