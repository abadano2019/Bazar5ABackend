import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

const productMock = {
  title: "Mixer",
  description: "Mixer 5 velocidades",
  code: "ABT584",
  category: "kitchen",
  status: true,
  thumbnail: [
    "./images/adc445d.jpeg",
    "./images/adc5505d.jpeg",
    "./images/adc5508.jpeg",
  ],
  stock: "A120",
  price: 2500,
};

const userAdmin = {
  first_name: "Prueba",
  last_name: "Test",
  email: "adminCoder@coder.com",
  password: "123456",
  role: "admin",
};

describe("Products's routes", function () {
  beforeEach(async function () {
    const response = await request.post("/users/login").send(userAdmin);
  });

  it("Metod Post /api/product", async function () {
    const response = await request
      .post("/api/products")
      .send(productMock)
      .auth("ptest@mail.com", "12345");
    expect(response).to.be.ok;
  });

  it("Metod Get (return all products) /api/product", async function () {
    const response = await request.get("/api/products");
    expect(response).to.be.ok;
  });

  it("Metod Get (Paginate) /api/product", async function () {
    const response = await request.get("/api/products/paginate");
    expect(response).to.be.ok;
  });
});

describe("GET /api/products", function () {
  it("Return all products", async function () {
    const response = await request
      .get("/api/products")
      .auth("ptest@mail.com", "12345")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("POST /api/products", function () {
  beforeEach(async function () {
    const response = await request.post("/users/login").send(userAdmin);
  });

  it("Add a product", function (done) {
    request
      .post("/api/products")
      .send(productMock)
      .auth("adminCoder@coder.com", "123456")
      .set("Accept", "application/json")
      //.expect('Content-Type', /json/)
      //.expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Users's routes", function () {
  beforeEach(function () {});

  it("Metod Post /api/product", async function () {
    const response = await request.post("/users/login").send(userAdmin);
    expect(response).to.be.ok;
  });

  it("User login and return a cookie", async function () {
    const result = await request.post("/users/login").send(userAdmin);
    const cookieResult = result.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;
    const cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    //expect(cookie.name).to.be.ok.and.eql("ver")
    expect(cookie.value).to.be.ok;
  });
});

describe("Cart's routes", function () {
  beforeEach(function () {});

  it("Metod Post /api/cart", async function () {
    const response = await request.post("/api/carts");
    expect(response).to.be.ok;
  });

  it("Metod Get /api/carts", async function () {
    const response = await request.get("/api/carts");
    expect(response).to.be.ok;
  });

  it("Metod Get - get cart by id /api/carts/{id}", async function () {
    const createdCart = await request.post("/api/carts");
    const id = createdCart._body.cart._id;
    const response = await request.get(`/api/carts/${id}`);
    expect(response).to.be.ok;
  });

  it("Metod delete - delete a cart by id /api/carts/{id}", async function () {
    const createdCart = await request.post("/api/carts");
    const id = createdCart._body.cart._id;
    const response = await request.delete(`/api/carts/${id}`);
    expect(response).to.be.ok;
  });

  it("Metod post - purchase a cart /api/carts/purchase", async function () {
    const ticket = {
      code: "14414",
      purchase_datetime: "05-05-2023",
      amount: 1000,
      items: [],
    };

    const parchaseCart = await request.post("/api/carts/parchase");
    expect(parchaseCart).to.be.ok;
  });

  it("Metod put - add a product quantity /:cid/products/:pid", async function () {
    const pid = '647cb1209f41edbbcd3d3bd3';
    const cid = '647d34b9ccde55628dede665';
    const result = await request.post(`/api/carts/${cid}/products/${pid}`);
    expect(result).to.be.ok;
  });
});
