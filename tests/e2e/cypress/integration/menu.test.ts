import { accountParams } from '../../../mocks/account-params'
import { mockServerError } from '../mocks'

describe('Menu', () => {
  const { name, accessToken } = accountParams

  beforeEach(() => {
    cy.setLocalStorageItem('account', { name, accessToken })
  })

  it('Should present error on UnexpectedError', () => {
    mockServerError('GET', /categories/)

    cy.visit('menu')

    cy.contains('Algo deu errado. Tente novamente!')
  })
})
