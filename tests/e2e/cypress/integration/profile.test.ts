import { mockNoContent, mockOk, mockServerError, mockUnauthorizedError } from '../mocks'

describe('Profile', () => {
  const mockError = (method: Function): void => method('GET', /addresses/)
  const mockSuccess = (): void => mockOk('GET', /addresses/, 'addresses-list')

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  it('Should present error on UnexpectedError', () => {
    mockError(mockServerError)

    cy.visit('profile')

    cy.contains('Algo deu errado. Tente novamente!')
    cy.get('button').contains('Tentar novamente')
  })

  it('Should reload on button click', () => {
    mockError(mockServerError)

    cy.visit('profile')
    cy.contains('Tentar novamente').click()

    cy.get('section').should('have.length', 1)
  })

  it('Should logout on UnauthorizedError', () => {
    mockError(mockUnauthorizedError)

    cy.visit('profile')

    cy.testUrl('/login')
  })

  it('Should present addresses list', () => {
    mockSuccess()

    cy.visit('profile')

    cy.get('section:empty').should('have.length', 1)
    cy.get('section').should('have.length', 1)
  })

  it('Should logout when exit button is clicked', () => {
    mockSuccess()

    cy.visit('profile')
    cy.get('button').contains('Sair').click()

    cy.testUrl('/login')
  })

  it('Should call delete address when delete button is clicked', () => {
    mockSuccess()
    mockNoContent('DELETE', /address/)

    cy.visit('profile')
    cy.getByTestId('details').click()
    cy.getByTestId('delete').click()

    cy.get('section:empty').should('have.length', 1)
  })

  it('Should prevent multiple requests on delete', () => {
    mockSuccess()
    mockNoContent('DELETE', /address/, 'deleteRequest')

    cy.visit('profile')
    cy.getByTestId('details').click()
    cy.getByTestId('delete').dblclick()
    cy.wait('@deleteRequest')

    cy.get('@deleteRequest.all').should('have.length', 1)
  })

  it('Should present alert error if delete fails', () => {
    mockSuccess()
    mockServerError('DELETE', /address/, 'deleteRequest')

    cy.visit('profile')
    cy.getByTestId('details').click()
    cy.getByTestId('delete').click()
    cy.wait('@deleteRequest')

    cy.contains('Algo deu errado. Tente novamente!')
  })

  it('Should go to add address page', () => {
    mockSuccess()

    cy.contains('Adicionar').click()

    cy.testUrl('/address/register')
  })
})
