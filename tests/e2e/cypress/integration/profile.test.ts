import { mockNoContent, mockOk, mockServerError, mockUnauthorizedError } from '../mocks'

import faker from 'faker'

describe('Profile', () => {
  const mockError = (method: Function): void => method('GET', /addresses/)
  const mockSuccess = (): void => mockOk('GET', /addresses/, 'address')
  const visit = (): any => cy.visit('profile')

  beforeEach(() => {
    cy.fixture('account').then(account => cy.setLocalStorageItem('account', account))
  })

  describe('List', () => {
    it('Should present error on UnexpectedError', () => {
      mockError(mockServerError)

      visit()

      cy.contains('Algo deu errado. Tente novamente!')
      cy.get('button').contains('Tentar novamente')
    })

    it('Should reload on button click', () => {
      mockError(mockServerError)

      visit()
      cy.contains('Tentar novamente').click()

      cy.get('section').should('have.length', 1)
    })

    it('Should logout on UnauthorizedError', () => {
      mockError(mockUnauthorizedError)

      visit()

      cy.testUrl('/login')
    })

    it('Should present addresses list', () => {
      mockSuccess()

      visit()

      cy.get('section:empty').should('have.length', 1)
      cy.get('section').should('have.length', 1)
    })

    it('Should logout when exit button is clicked', () => {
      mockSuccess()

      visit()
      cy.get('button').contains('Sair').click()

      cy.testUrl('/login')
    })

    it('Should go to add address page', () => {
      mockSuccess()

      visit()
      cy.contains('Adicionar').click()

      cy.testUrl('/address/register')
    })
  })

  describe('active', () => {
    it('Should call active address when main is clicked', () => {
      mockSuccess()
      mockNoContent('PUT', /address/, 'activeAddress')

      visit()
      cy.wait('@request')
      cy.get('main').click()

      cy.wait('@activeAddress')

      cy.get('@activeAddress.all').should('have.length', 1)
    })
  })

  describe('delete', () => {
    it('Should call delete address when delete button is clicked', () => {
      mockSuccess()
      mockNoContent('DELETE', /address/)

      visit()
      cy.getByTestId('details').click()
      cy.getByTestId('delete').click()

      cy.get('section:empty').should('have.length', 1)
    })

    it('Should prevent multiple requests on delete', () => {
      mockSuccess()
      mockNoContent('DELETE', /address/, 'deleteRequest')

      visit()
      cy.wait('@request')
      cy.getByTestId('details').click()
      cy.getByTestId('delete').dblclick()
      cy.wait('@deleteRequest')

      cy.get('@deleteRequest.all').should('have.length', 1)
    })

    it('Should present alert error if delete fails', () => {
      mockSuccess()
      mockServerError('DELETE', /address/, 'deleteRequest')

      visit()
      cy.wait('@request')
      cy.getByTestId('details').click()
      cy.getByTestId('delete').click()
      cy.wait('@deleteRequest')

      cy.contains('Algo deu errado. Tente novamente!')
    })

    it('Should logout if delete return UnauthorizedError', () => {
      mockSuccess()
      mockUnauthorizedError('DELETE', /address/, 'deleteRequest')

      visit()
      cy.wait('@request')
      cy.getByTestId('details').click()
      cy.getByTestId('delete').click()

      cy.testUrl('/login')
    })
  })

  describe('edit', () => {
    const surname = faker.random.word()
    const number = faker.datatype.number()
    const complement = faker.random.words(2)

    const openEditModal = (): void => {
      cy.getByTestId('details').click()
      cy.getByTestId('edit').click()
    }

    const populateFields = (): void => {
      openEditModal()
      cy.getInputById('number').focus().clear().type(number.toString())
      cy.getInputById('complement').focus().clear().type(complement)
      cy.getInputById('surname').focus().clear().type(surname)
    }

    const simulateSubmit = (): void => {
      populateFields()
      cy.getSubmitButton().click()
    }

    it('Should load edit modal with correct initial state', () => {
      mockSuccess()

      visit()
      openEditModal()

      cy.getSubmitButton().should('be.enabled').should('have.text', 'Salvar')
    })

    it('Should keep the button disabled if form is invalid', () => {
      mockSuccess()

      visit()
      cy.wait('@request')
      openEditModal()
      cy.getInputById('number').focus().clear()

      cy.getInputById('number').should('have.attr', 'title', 'Campo obrigatório')
      cy.getSubmitButton().should('be.disabled')
    })

    it('Should enable the button if form is valid', () => {
      mockSuccess()

      visit()
      cy.wait('@request')
      populateFields()

      cy.getSubmitButton().should('be.enabled')
    })

    it('Should present UnexpectedError on 500', () => {
      mockSuccess()
      mockServerError('PUT', /address/)

      visit()
      cy.wait('@request')
      simulateSubmit()

      cy.contains('Algo deu errado. Tente novamente!')
    })

    it('Should logout if edit return UnauthorizedError', () => {
      mockSuccess()
      mockUnauthorizedError('PUT', /address/)

      visit()
      cy.wait('@request')
      simulateSubmit()

      cy.testUrl('/login')
    })

    it('Should prevent multiple submits', () => {
      mockSuccess()
      mockServerError('PUT', /address/, 'updateAddress')

      visit()
      cy.wait('@request')
      populateFields()
      cy.getSubmitButton().dblclick()
      cy.wait('@updateAddress')

      cy.get('@updateAddress.all').should('have.length', 1)
    })

    it('Should not call submit if form is invalid', () => {
      mockSuccess()
      mockServerError('PUT', /address/, 'updateAddress')

      visit()
      cy.wait('@request')
      openEditModal()
      cy.getInputById('number').focus().clear().type('{enter}')

      cy.get('@updateAddress.all').should('have.length', 0)
    })

    it('Should close modal on success', () => {
      mockSuccess()
      mockNoContent('PUT', /address/, 'updateAddress')

      visit()
      cy.wait('@request')
      simulateSubmit()
      cy.wait('@updateAddress')

      cy.get('form').should('not.exist')
    })
  })
})
