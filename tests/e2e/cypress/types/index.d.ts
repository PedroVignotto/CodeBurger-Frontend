declare namespace Cypress {
  export interface Chainable {
    getSubmitButton: () => Chainable<Element>
    getInputById: (id: string) => Chainable<Element>
  }
}
