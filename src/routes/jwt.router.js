import { Router } from "express";
import { getAuthUser } from "../middlewares/auth.middleware.js";
import { jwtValidation } from '../middlewares/jwt.middleware.js'
import { loginJwtController } from "../controllers/jwt.controller.js";
import passport from 'passport'

const router = Router();

// Login usando jwt con cookies
router.post("/login", loginJwtController);

// utilización de un middleware para la validación de token
router.get("/login", jwtValidation, (req, res) => {
  res.send("JWT Validado");
});

// utilización de passport para la validación del token,utilizando fromAuthHeaderAsBearerToken
router.get(
  "/loginJWTPassport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("JWT PASSPORT");
  }
);

// utilización de passport para la validación del token, despligue del usuario, utiizando cookies, cookieExtrartor
router.get(
  "/current",
  passport.authenticate("current", { session: false }),getAuthUser,
  (req, res) => {
    console.log(req.user);
    //res.send("USER JWT COOKIES PASSPORT", req.user);
    res.status(200).send(req.user)
  }
);

// utilización de passport para la validación del token y posterior despliegue de información de productos
router.get(
  "/loginJWTCookiesPassportProductos",
  passport.authenticate("current", { session: false }),getAuthUser,
  (req, res) => {
    res.redirect("/views/productsCookies");
  }
);

export default router;
