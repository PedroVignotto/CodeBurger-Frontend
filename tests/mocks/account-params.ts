import faker from 'faker'

export const accountParams = {
  email: faker.internet.email(),
  password: faker.internet.password(8)
}
