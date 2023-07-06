import {
  deleteProductsRealTime2Controller,
  modifyProductsRealTime2Controller,
  putUpFileProductsController,
  putUpFileProfilesController,
  viewCartByIdController,
  viewCartItemsController,
  viewCheckoutController,
  viewGetUpFileController,
  viewGetUpFileDocumentsController,
  viewGetUpFileProductsController,
  viewGetUpFileProfilesController,
  viewListProductsController,
  viewMenuController,
  viewProductsController,
  viewProductsCookiesController,
  viewProductsRealTime2Controller,
  viewProductsRealTimeController,
  viewPutUpFileController,
  viewPutUpFileDocumentsController,
  viewUsersController
} from "../controllers/views.controller.js";
import { getAuthAdminPremiumSession, getAuthAdminSession, getAuthUserSession } from "../middlewares/auth.middleware.js";

import { Router } from "express";
import logger from "../logger/winston.js"
import passport from "passport";
import { upload_file } from "../middlewares/multer.middleware.js";
import { upload_file_documents } from "../middlewares/multer_documents.middleware.js";
import {upload_file_products} from "../middlewares/multer_products.middleware.js"
import {upload_file_profiles} from "../middlewares/multer_profiles.middleware.js"
import { viewChatController } from "../controllers/views.controller.js";

const router = new Router();

// Vista para ser utilizada con protocalo http, layout home,
router.get("/", viewListProductsController);

// Vista para ser utilizada con protocolo WebSocket, layount home, implementación de un Chat
router.get("/chat", viewChatController);

// Vista para ser utilizada para visualizar los productos paginados
router.get("/products", getAuthUserSession, viewProductsController);

// Vista para ser utilizada para visualizar los productos paginados
router.get("/menu", getAuthAdminPremiumSession, viewMenuController);

router.get("/cartItems", getAuthUserSession, viewCartItemsController);

router.post("/checkout", getAuthUserSession, viewCheckoutController);

// Vista para ser utilizada para visualizar los productos paginados
router.get("/users", getAuthAdminSession, viewUsersController);

// Vista para ser utilizada para visualizar los productos paginados
router.get(
  "/productsCookies",
  passport.authenticate("current", { session: false }),
  viewProductsCookiesController
);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/realtimeproducts", viewProductsRealTimeController);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/realtimeproducts2", getAuthAdminPremiumSession, viewProductsRealTime2Controller);

router.get("/realTimeProductsDelete", getAuthAdminPremiumSession, deleteProductsRealTime2Controller);

router.get("/realTimeProductsModify", getAuthAdminPremiumSession, modifyProductsRealTime2Controller);

// Vista para ser utilizada para visualizar los productos de un carrito dado
router.get("/carts/:cid", viewCartByIdController);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/upfile", viewGetUpFileController);

router.post("/upfile", upload_file.array("foto", 2), viewPutUpFileController);

router.get("/upfile_documents", viewGetUpFileDocumentsController);

router.post("/upfile_documents", upload_file_documents.array("foto", 3), viewPutUpFileDocumentsController);

router.get("/upfile_products", viewGetUpFileProductsController);

router.post("/upfile_products", upload_file_products.array("foto", 10), putUpFileProductsController);

router.get("/upfile_profiles", viewGetUpFileProfilesController);

router.post("/upfile_profiles", upload_file_profiles.array("foto", 1), putUpFileProfilesController);

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.get("/resetPassword", (req, res) => {
  res.render("resetPassword");
});

router.get("/resetPassword/:email/token/:token", (req,res) => {
  const {email,token} = req.params
  const data = {
    email: email,
    token: token,
  }
  res.render("setNewPassword", {data})
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/perfil", (req, res) => {
  res.render("perfil");
});

router.get("/jwtLoginFront", (req, res) => {
  res.render("jwt");
});

router.get("/loggerTest", (req, res) => {
  
  logger.fatal("Prueba de logger fatal")
  logger.error("Prueba de logger error")
  logger.warning("Prueba de logger warning")
  logger.info("Prueba de logger info")
  logger.http("Prueba de logger http")
  logger.debug("Prueba de logger debug")

  res.status(200).json("Winston test ejecutado")

});

export default router;
