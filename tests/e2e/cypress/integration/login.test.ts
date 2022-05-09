import { mockBadRequestError, mockOk, mockServerError, mockUnauthorizedError } from '../mocks'

import faker from 'faker'

describe('Login', () => {
  const validEmail: string = faker.internet.email()
  const invalidEmail: string = faker.random.word()
  const password: string = faker.internet.password()
  const name: string = faker.name.findName()
  const accessToken: string = faker.datatype.uuid()

  beforeEach(() => {
    cy.visit('login')
  })

  const populateFields = (email = validEmail): void => {
    cy.getInputById('email').focus().type(email)
    cy.getInputById('password').focus().type(password)
  }

  const simulateSubmit = (): void => {
    populateFields()
    cy.getSubmitButton().click()
  }

  it('Should load with correct initial state', () => {
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Login')
  })

  it('Should keep the button disabled if form is invalid', () => {
    populateFields(invalidEmail)

    cy.getInputById('email').should('have.attr', 'title', 'Valor inválido')
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Login')
  })

  it('Should enable the button if form is valid', () => {
    populateFields()

    cy.getSubmitButton().should('be.enabled').should('have.text', 'Login')
  })

  it('Should show spinner on submit button click', () => {
    simulateSubmit()

    cy.getSubmitButton().should('not.have.text', 'Login')
    cy.getSubmitButton().should('have.text', 'Login')
  })

  it('Should present UnexpectedError on 400', () => {
    mockBadRequestError('POST', /login/)

    simulateSubmit()

    cy.contains('Algo deu errado. Tente novamente!')
    cy.getUrl('/login')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockUnauthorizedError('POST', /login/)

    simulateSubmit()

    cy.contains('Credenciais inválidas')
    cy.getUrl('/login')
  })

  it('Should present UnexpectedError on 500', () => {
    mockServerError('POST', /login/)

    simulateSubmit()

    cy.contains('Algo deu errado. Tente novamente!')
    cy.getUrl('/login')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockOk('POST', /login/, { name, accessToken })

    simulateSubmit()

    cy.getUrl('/')
    cy.getLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockOk('POST', /login/, { name, accessToken })

    populateFields()
    cy.getSubmitButton().click()
    cy.wait('@request')

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockOk('POST', /login/, { name, accessToken })

    cy.getInputById('email').focus().type(validEmail).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
})
