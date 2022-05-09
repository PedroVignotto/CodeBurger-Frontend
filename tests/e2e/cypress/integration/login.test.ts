import faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Login')
  })

  it('Should keep the button disabled if form is invalid', () => {
    cy.getInputById('email').focus().type(faker.random.word()).should('have.attr', 'title', 'Valor inválido')
    cy.getInputById('password').focus().type(faker.random.word())

    cy.getSubmitButton().should('be.disabled').should('have.text', 'Login')
  })
})
