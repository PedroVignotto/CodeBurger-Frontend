declare namespace Cypress {
  export interface Chainable {
    getSubmitButton: () => Chainable<Element>
    getInputById: (id: string) => Chainable<Element>
    testUrl: (path: string) => Chainable<Element>
    testLocalStorageItem: (item: string) => Chainable<Element>
    setLocalStorageItem: (key: string, value: any) => Chainable<Element>
    getByTestId: (id: string) => Chainable<Element>
  }
}
