declare namespace Cypress {
  export interface Chainable {
    getSubmitButton: () => Chainable<Element>
    getInputById: (id: string) => Chainable<Element>
    getUrl: (path: string) => Chainable<Element>
    getLocalStorageItem: (item: string) => Chainable<Element>
  }
}
