describe('Private Routes', () => {
  it('Should logout if menu has no accessToken', () => {
    cy.visit('menu')

    cy.testUrl('/login')
  })

  it('Should logout if profile has no accessToken', () => {
    cy.visit('profile')

    cy.testUrl('/login')
  })
})
