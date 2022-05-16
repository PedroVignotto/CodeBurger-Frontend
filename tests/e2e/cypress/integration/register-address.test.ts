import { mockBadRequestError, mockOk, mockServerError } from '../mocks'

import faker from 'faker'

describe('RegisterAddress', () => {
  const validZipCode = faker.address.zipCode('########')
  const invalidZipCode = faker.address.zipCode('####')

  const mockError = (method: Function): void => method('GET', /address/)
  const mockSuccess = (): void => mockOk('GET', /address/, 'search-address')

  const populateSearchFormFields = (zipCode = validZipCode): void => {
    cy.getInputById('zipCode').focus().type(zipCode)
  }

  const simulateSearchFormSubmit = (): void => {
    populateSearchFormFields()
    cy.getSubmitButton().click()
  }

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  it('Should load with correct initial state', () => {
    cy.visit('address/register')

    cy.getSubmitButton().should('be.disabled').should('have.text', 'Buscar')
  })

  it('Should keep the button disabled if form is invalid', () => {
    cy.visit('address/register')

    populateSearchFormFields(invalidZipCode)

    cy.getInputById('zipCode').should('have.attr', 'title', 'Valor inválido')
    cy.getSubmitButton().should('be.disabled')
  })

  it('Should enable the button if form is valid', () => {
    cy.visit('address/register')

    populateSearchFormFields()

    cy.getSubmitButton().should('be.enabled')
  })

  it('Should present FieldNotFoundError on 400', () => {
    cy.visit('address/register')
    mockError(mockBadRequestError)

    simulateSearchFormSubmit()
    cy.wait('@request')

    cy.contains('CEP não encontrado')
  })

  it('Should present UnexpectedError on 500', () => {
    cy.visit('address/register')
    mockError(mockServerError)

    simulateSearchFormSubmit()
    cy.wait('@request')

    cy.contains('Algo deu errado. Tente novamente!')
  })

  it('Should show form add if SearchAddress succeeds', () => {
    cy.visit('address/register')
    mockSuccess()

    simulateSearchFormSubmit()
    cy.wait('@request')

    cy.getSubmitButton().should('be.disabled').should('have.text', 'Adicionar')
  })
})
