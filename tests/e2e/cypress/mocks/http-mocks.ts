import faker from 'faker'

export const mockOk = (method: string, url: RegExp, fixture: string | object, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 200, fixture }
  ).as(alias)
}

export const mockCreated = (method: string, url: RegExp, fixture?: string | object, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 201, fixture }
  ).as(alias)
}

export const mockNoContent = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 204 }
  ).as(alias)
}

const body = { error: faker.random.words() }

export const mockBadRequestError = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 400, body }
  ).as(alias)
}

export const mockUnauthorizedError = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 401, body }
  ).as(alias)
}

export const mockServerError = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 500, body }
  ).as(alias)
}
