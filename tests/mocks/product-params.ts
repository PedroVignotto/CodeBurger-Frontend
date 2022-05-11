import faker from 'faker'

export const productParams = {
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  picture: faker.internet.url()
}
