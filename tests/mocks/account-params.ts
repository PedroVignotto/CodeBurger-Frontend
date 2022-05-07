import faker from 'faker'

export const accountParams = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  accessToken: faker.datatype.uuid()
}
