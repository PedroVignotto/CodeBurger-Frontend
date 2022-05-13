import { accountParams } from '../../../mocks/account-params'
import { mockServerError, mockUnauthorizedError } from '../mocks'

describe('Menu', () => {
  const { name, accessToken } = accountParams

  beforeEach(() => {
    cy.setLocalStorageItem('account', { name, accessToken })
  })

  it('Should present error on UnexpectedError', () => {
    mockServerError('GET', /categories/)

    cy.visit('menu')

    cy.contains('Algo deu errado. Tente novamente!')
    cy.get('button').should('be.visible')
  })

  it('Should logout on UnauthorizedError', () => {
    mockUnauthorizedError('GET', /categories/)

    cy.visit('menu')

    cy.testUrl('/login')
  })
})
