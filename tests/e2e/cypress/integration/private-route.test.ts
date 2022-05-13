describe('Private Routes', () => {
  it('Should logout if menu has no accessToken', () => {
    cy.visit('menu')

    cy.getUrl('/login')
  })
})
