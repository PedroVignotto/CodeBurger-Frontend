Cypress.Commands.add('getSubmitButton', () => cy.get('button[type=submit]'))

Cypress.Commands.add('getInputById', (id) => cy.get(`input[id=${id}]`))

Cypress.Commands.add('getUrl', (path) => cy.url().should('eq', `${Cypress.config().baseUrl}${path}`))

Cypress.Commands.add('getLocalStorageItem', (item) => cy.window().then(window => assert.isOk(window.localStorage.getItem(item))))
