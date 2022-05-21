import { mockCreated, mockOk, mockServerError, mockUnauthorizedError } from '../mocks'

describe('Menu', () => {
  const mockError = (method: Function): void => method('GET', /categories/)
  const mockSuccess = (): void => mockOk('GET', /categories/, 'categories-list')

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  describe('list', () => {
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

  describe('cart', () => {
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

    it('Should remove product on cart when quantity is equal an one', () => {
      mockSuccess()

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('decrement').click()

      cy.contains('0 itens')
      cy.getByTestId('emptyCart').should('be.exist')
    })

    it('Should increment product quantity', () => {
      mockSuccess()

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('increment').dblclick()

      cy.contains('R$ 150,00')
      cy.contains('R$ 155,00')
    })

    it('Should decrement product quantity', () => {
      mockSuccess()

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('increment').dblclick()
      cy.getByTestId('decrement').click()

      cy.contains('R$ 100,00')
      cy.contains('R$ 105,00')
    })

    it('Should create a new order', () => {
      mockSuccess()
      mockCreated('POST', /order/)

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('addOrder').click()

      cy.getByTestId('success').should('be.exist')
    })

    it('Should prevent multiple submits', () => {
      mockSuccess()
      mockCreated('POST', /order/, '', 'orderRequest')

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('addOrder').click()
      cy.wait('@orderRequest')

      cy.get('@orderRequest.all').should('have.length', 1)
    })

    it('Should present UnexpectedError on 500', () => {
      mockSuccess()
      mockServerError('POST', /order/)

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('addOrder').click()

      cy.contains('Algo deu errado. Tente novamente!')
    })

    it('Should logout on UnauthorizedError', () => {
      mockSuccess()
      mockUnauthorizedError('POST', /order/)

      cy.visit('menu')

      cy.getByTestId('addToCartButton').first().click()
      cy.getByTestId('openCart').click()
      cy.getByTestId('addOrder').click()

      cy.testUrl('/login')
    })
  })
})
