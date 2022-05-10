import { mockBadRequestError } from '../mocks'

import faker from 'faker'

describe('Signup', () => {
  const validEmail: string = faker.internet.email()
  const invalidEmail: string = faker.random.word()
  const password: string = faker.internet.password(8)
  const invalidPasswordConfirmation: string = faker.internet.password(16)
  const name: string = faker.name.findName()

  beforeEach(() => {
    cy.visit('signup')
  })

  const populateFields = (email = validEmail, passwordConfirmation = password): void => {
    cy.getInputById('name').focus().type(name)
    cy.getInputById('email').focus().type(email)
    cy.getInputById('password').focus().type(password)
    cy.getInputById('passwordConfirmation').focus().type(passwordConfirmation)
  }

  const simulateSubmit = (): void => {
    populateFields()
    cy.getSubmitButton().click()
  }

  it('Should load with correct initial state', () => {
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Cadastre-se')
  })

  it('Should keep the button disabled if form is invalid', () => {
    populateFields(invalidEmail, invalidPasswordConfirmation)

    cy.getInputById('email').should('have.attr', 'title', 'Valor inválido')
    cy.getInputById('passwordConfirmation').should('have.attr', 'title', 'Valor inválido')
    cy.getSubmitButton().should('be.disabled')
  })

  it('Should enable the button if form is valid', () => {
    populateFields()

    cy.getSubmitButton().should('be.enabled')
  })

  it('Should show spinner on submit button click', () => {
    mockBadRequestError('POST', /signup/)

    simulateSubmit()

    cy.getSubmitButton().should('not.have.text', 'Cadastre-se')
    cy.wait('@request')
    cy.getSubmitButton().should('have.text', 'Cadastre-se')
  })
})
