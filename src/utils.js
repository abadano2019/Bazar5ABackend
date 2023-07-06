import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import logger from "../src/logger/winston.js"
import moment from "moment/moment.js";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, passwordBD) => {
  const compare = await bcrypt.compare(password, passwordBD);
  logger.info("Comparación de passwords:", compare)
  console.log(compare);
  return compare;
};

export const generateToken = (user) => {
  const token = jwt.sign({ user }, "secretJWT", { expiresIn: "1h" });
  return token;
};

export const decodeToken = (token) => {
  const payload = jwt.decode(token, "secretJWT");

  if (payload.exp <= moment().unix()) {
    console.log(payload.exp)
    console.log("Moment unix",moment().unix())
    console.log("expirado")
    //return res.status(401).send({ message: "El token ha expirado" });
  }
  return payload
}

export const expiredToken = (token) => {
  let expired = false
  const payload = jwt.decode(token, "secretJWT");
  if (payload.exp <= moment().unix()) {
    expired = true;
  }
  return expired
}
