import { mockServerError } from '../mocks'

describe('profile', () => {
  const mockError = (method: Function): void => method('GET', /addresses/)

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  it('Should present error on UnexpectedError', () => {
    mockError(mockServerError)

    cy.visit('profile')

    cy.contains('Algo deu errado. Tente novamente!')
    cy.get('button').contains('Tentar novamente')
  })
})
