describe('RegisterAddress', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
    cy.visit('address/register')
  })

  it('Should load with correct initial state', () => {
    cy.getSubmitButton().should('be.disabled').should('have.text', 'Buscar')
  })
})
