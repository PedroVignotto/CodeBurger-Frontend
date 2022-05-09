import faker from 'faker'

export const mockBadRequestError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 400, body: { error: faker.random.words() } }
  ).as('request')
}

export const mockUnauthorizedError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 401, body: { error: faker.random.words() } }
  ).as('request')
}

export const mockServerError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 500, body: { error: faker.random.words() } }
  ).as('request')
}
