import faker from 'faker'

const password = faker.internet.password(8)

export const accountParams = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password,
  accessToken: faker.datatype.uuid(),
  error: faker.random.words(3)
}
