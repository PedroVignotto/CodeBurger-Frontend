declare namespace Cypress {
  export interface Chainable {
    getSubmitButton: () => Chainable<Element>
  }
}
