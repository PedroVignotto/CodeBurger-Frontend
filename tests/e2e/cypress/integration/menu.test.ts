import { mockServerError, mockUnauthorizedError } from '../mocks'

describe('Menu', () => {
  const mockError = (method: Function): void => method('GET', /categories/)

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  it('Should present error on UnexpectedError', () => {
    mockError(mockServerError)

    cy.visit('menu')

    cy.contains('Algo deu errado. Tente novamente!')
    cy.get('button').should('be.visible')
  })

  it('Should logout on UnauthorizedError', () => {
    mockError(mockUnauthorizedError)

    cy.visit('menu')

    cy.testUrl('/login')
  })
})
