describe('Private Routes', () => {
  it('Should logout if menu has no accessToken', () => {
    cy.visit('menu')

    cy.testUrl('/login')
  })

  it('Should logout if profile has no accessToken', () => {
    cy.visit('profile')

    cy.testUrl('/login')
  })

  it('Should logout if register address has no accessToken', () => {
    cy.visit('address/register')

    cy.testUrl('/login')
  })
})
