import { faker } from '@faker-js/faker'

export const generateUser = () => {

  const products = []
    for(let i=0;i<Math.floor((Math.random() * 20));i++){
        const product = generateProduct()
        products.push(product)
    }

  const user = {
    id:faker.database.mongodbObjectId(),
    fisrt_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 80 }),
    email: faker.helpers.unique(faker.internet.email),
    password:faker.internet.password(),
    cart: products,
    role:faker.helpers.arrayElement(['admin', 'user']),
  }
  return user
}


export const generateProduct = () => {
    const product = {
        id:faker.database.mongodbObjectId(),
        title:faker.commerce.product(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        stock: faker.random.numeric(),
        code: faker.helpers.unique(faker.datatype.number),
        thumbnails:[],
        status: faker.datatype.boolean()
    }
    return product
}

