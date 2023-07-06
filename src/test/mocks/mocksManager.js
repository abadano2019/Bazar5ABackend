import { generateProduct } from "./mocks.js";
import { generateUser } from "./mocks.js";

export const createProducts = (quantity) => {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    const product = generateProduct();
    products.push(product);
  }
  return products;
};

export const createUsers = (quantity) => {
  const users = [];
  for (let i = 0; i < quantity; i++) {
    const user = generateUser();
    users.push(user);
  }
  return users;
};
