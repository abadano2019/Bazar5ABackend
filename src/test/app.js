import { __dirname } from "../utils.js";
import config from "../config.js";
import { createProducts } from "./mocks/mocksManager.js";
import {createUsers} from "./mocks/mocksManager.js"
import express from "express";

const PORT = config.TEST_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mockingProducts", (req, res) => {
  const products = createProducts(1000);
  res.json({ products });
});

app.get("/mockingUsers", (req, res) => {
  const users = createUsers(1000);
  res.json({ users });
});

app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.listen(PORT, () => {
  console.log("******* Ejecutando servidor de TESTING *******");
  console.log(`*** Escuchando al puerto:  ${PORT} ***`);
});
