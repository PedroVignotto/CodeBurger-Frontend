import faker from 'faker'

export const mockUnauthorizedError = (method: string, url: RegExp): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 401, body: { error: faker.random.words() } }
  ).as('request')
}
