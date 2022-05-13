import { mockBadRequestError, mockCreated, mockServerError } from '../mocks'

import faker from 'faker'

describe('Signup', () => {
  const validEmail: string = faker.internet.email()
  const invalidEmail: string = faker.random.word()
  const password: string = faker.internet.password(8)
  const invalidPasswordConfirmation: string = faker.internet.password(16)
  const name: string = faker.name.findName()

  const mockError = (method: Function): void => method('POST', /signup/)
  const mockSuccess = (): void => mockCreated('POST', /signup/, 'account')

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

  beforeEach(() => {
    cy.visit('signup')
  })

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

  it('Should present FieldInUseError on 400', () => {
    mockError(mockBadRequestError)

    simulateSubmit()

    cy.contains('O email já está em uso!')
    cy.testUrl('/signup')
  })

  it('Should present UnexpectedError on 500', () => {
    mockError(mockServerError)

    simulateSubmit()

    cy.contains('Algo deu errado. Tente novamente!')
    cy.testUrl('/signup')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccess()

    simulateSubmit()

    cy.testUrl('/')
    cy.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()

    populateFields()
    cy.getSubmitButton().dblclick()
    cy.wait('@request')

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()

    cy.getInputById('email').focus().type(validEmail).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
})
