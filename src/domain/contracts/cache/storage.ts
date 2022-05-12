export interface SetStorage {
  set: (input: SetStorage.Input) => SetStorage.Output
}

export namespace SetStorage {
  export type Input = { key: string, value: object }
  export type Output = void
}

export interface GetStorage {
  get: (input: GetStorage.Input) => GetStorage.Output
}

export namespace GetStorage {
  export type Input = { key: string }
  export type Output = any
}
