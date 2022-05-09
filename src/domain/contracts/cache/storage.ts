export interface SetStorage {
  set: (input: SetStorage.Input) => SetStorage.Output
}

export namespace SetStorage {
  export type Input = { key: string, value: object }
  export type Output = void
}
