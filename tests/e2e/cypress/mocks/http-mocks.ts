import faker from 'faker'

export const mockOk = (method: string, url: RegExp, fixture: string | object): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 200, fixture }
  ).as('request')
}

export const mockCreated = (method: string, url: RegExp, fixture: string | object): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 201, fixture }
  ).as('request')
}

const body = { error: faker.random.words() }

export const mockBadRequestError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 400, body }
  ).as('request')
}

export const mockUnauthorizedError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 401, body }
  ).as('request')
}

export const mockServerError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 500, body }
  ).as('request')
}
