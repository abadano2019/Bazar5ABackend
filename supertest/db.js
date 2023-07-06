import config from "../src/config.js";
import mongoose from "mongoose";

/*export const conectionDb = async() => {
  const URI = config.MONGO_TEST_URI;
  mongoose
    .connect(URI)
    .then(() => console.log("************Conectado a la base de datos*******************"))
    .catch((error) => console.log(error));
};*/


  const URI = config.MONGO_TEST_URI;
  mongoose
    .connect(URI)
    .then(() => console.log("************Conectado a la base de datos*******************"))
    .catch((error) => console.log(error));
