import faker from 'faker'

describe('RegisterAddress', () => {
  const validZipCode = faker.address.zipCode('########')
  const invalidZipCode = faker.address.zipCode('####')

  const populateSearchFormFields = (zipCode = validZipCode): void => {
    cy.getInputById('zipCode').focus().type(zipCode)
  }

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
    cy.visit('address/register')
  })

  it('Should load with correct initial state', () => {
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Buscar')
  })

  it('Should keep the button disabled if form is invalid', () => {
    populateSearchFormFields(invalidZipCode)

    cy.getInputById('zipCode').should('have.attr', 'title', 'Valor inválido')
    cy.getSubmitButton().should('be.disabled')
  })

  it('Should enable the button if form is valid', () => {
    populateSearchFormFields()

    cy.getSubmitButton().should('be.enabled')
  })
})
