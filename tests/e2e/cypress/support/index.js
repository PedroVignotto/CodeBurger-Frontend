Cypress.Commands.add('getSubmitButton', () => cy.get('button[type=submit]'))
Cypress.Commands.add('getInputById', (id) => cy.get(`input[id=${id}]`))
