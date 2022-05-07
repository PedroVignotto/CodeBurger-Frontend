import { HttpMethod } from '@/domain/contracts/http'
import faker from 'faker'

export const httpClientParams = {
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']) as HttpMethod,
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  statusCode: faker.random.arrayElement([200, 201, 204, 400, 401, 403, 500]),
  data: faker.random.objectElement()
}
