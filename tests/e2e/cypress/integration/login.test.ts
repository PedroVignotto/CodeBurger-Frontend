import { accountParams } from '../../../mocks/account-params'
import { mockBadRequestError, mockOk, mockServerError, mockUnauthorizedError } from '../mocks'

import faker from 'faker'

describe('Login', () => {
  const invalidEmail: string = faker.random.word()

  const { email: validEmail, password, name, accessToken } = accountParams

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
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Entrar')
  })

  it('Should keep the button disabled if form is invalid', () => {
    populateFields(invalidEmail)

    cy.getInputById('email').should('have.attr', 'title', 'Valor inválido')
    cy.getSubmitButton().should('be.disabled')
  })

  it('Should enable the button if form is valid', () => {
    populateFields()

    cy.getSubmitButton().should('be.enabled')
  })

  it('Should present UnexpectedError on 400', () => {
    mockBadRequestError('POST', /login/)

    simulateSubmit()
    cy.wait('@request')

    cy.contains('Algo deu errado. Tente novamente!')
    cy.testUrl('/login')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockUnauthorizedError('POST', /login/)

    simulateSubmit()
    cy.wait('@request')

    cy.contains('Credenciais inválidas')
    cy.testUrl('/login')
  })

  it('Should present UnexpectedError on 500', () => {
    mockServerError('POST', /login/)

    simulateSubmit()
    cy.wait('@request')

    cy.contains('Algo deu errado. Tente novamente!')
    cy.testUrl('/login')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockOk('POST', /login/, { name, accessToken })

    simulateSubmit()
    cy.wait('@request')

    cy.testUrl('/')
    cy.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    mockOk('POST', /login/, { name, accessToken })

    populateFields()
    cy.getSubmitButton().dblclick()
    cy.wait('@request')

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockOk('POST', /login/, { name, accessToken })

    cy.getInputById('email').focus().type(validEmail).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
})
