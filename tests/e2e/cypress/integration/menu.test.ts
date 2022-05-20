import { mockOk, mockServerError, mockUnauthorizedError } from '../mocks'

describe('Menu', () => {
  const mockError = (method: Function): void => method('GET', /categories/)
  const mockSuccess = (): void => mockOk('GET', /categories/, 'categories-list')

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  describe('Menu', () => {
    it('Should present error on UnexpectedError', () => {
      mockError(mockServerError)

      cy.visit('menu')

      cy.contains('Algo deu errado. Tente novamente!')
      cy.get('button').contains('Tentar novamente')
    })

    it('Should reload on button click', () => {
      mockError(mockServerError)

      cy.visit('menu')
      cy.contains('Tentar novamente').click()

      cy.get('ul').should('have.length', 2)
      cy.get('li:empty').should('have.length', 7)
    })

    it('Should logout on UnauthorizedError', () => {
      mockError(mockUnauthorizedError)

      cy.visit('menu')

      cy.testUrl('/login')
    })

    it('Should present categories list', () => {
      mockSuccess()

      cy.visit('menu')

      cy.get('ul').should('have.length', 2)
      cy.get('li:empty').should('have.length', 7)
      cy.get('ul').should('have.length', 3)
      cy.get('li:not(:empty)').should('have.length', 6)
    })
  })

  describe('Cart', () => {
    it('Should close cart', () => {
      mockSuccess()

      cy.visit('menu')

      cy.getByTestId('openCart').click()
      cy.getByTestId('closeCart').click()
    })

    it('Should add product on cart', () => {
      mockSuccess()

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('addToCartButton').last().click()
      cy.getByTestId('openCart').click()

      cy.contains('2 itens')
      cy.contains('R$ 92,00')
      cy.contains('R$ 97,00')
      cy.getByTestId('emptyCart').should('not.be.exist')
    })

    it('Should not add duplicated product on cart', () => {
      mockSuccess()

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().dblclick()
      cy.getByTestId('openCart').click()

      cy.contains('1 item')
      cy.contains('R$ 100,00')
      cy.contains('R$ 105,00')
      cy.getByTestId('emptyCart').should('not.be.exist')
    })
  })
})
