import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import { __dirname } from "../utils.js";
import cartsServices from "../services/carts.service.js";
import logger from "../logger/winston.js";
import productsServices from "../services/products.service.js";
import usersServices from "../services/users.service.js";

export const viewProductsController = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { user } = req.session;
    if (user) {
      const { sessionID } = req.sessionID;
      logger.info("viewProductsController: SessionID:" + sessionID);
      const productsPag = await productsServices.getProductsService(5, page);
      logger.info("viewProductsController: finded products:", productsPag);

      const productsPaginate = {
        user: user,
        email: req.session.email,
        productsPag: productsPag,
      };
      logger.info(
        "viewProductsController: finded products paginate:",
        productsPaginate
      );
      res.render("products", { productsPaginate, layout: "products" });
    } else {
      logger.error("viewProductsController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewProductsController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};


export const viewMenuController = async (req, res, next) => {
  try {
    const { user } = req.session;
    if (user) {
      const { sessionID } = req.sessionID;
      logger.info("viewMenuController : SessionID:" + sessionID);
      
      //res.redirect("http://localhost:3000/");
      res.render("menu", { layout: "menu" });
    } else {
      logger.error("viewMenuController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewMenuController , Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewCartItemsController = async (req, res, next) => {
  try {
    const email = req.session.email;
    logger.info("viewCartItemsController: Session: ", req.session);
    const user = await usersServices.getUserByIdService(email);
    if (user) {
      logger.info("viewCartItemsController: user: " + email);
      const cart = user.cart.cartProducts;
      const cartArray = Object.values(cart);
      logger.info("viewCartItemsController: cart id: " + user.cart._id);
      logger.info("viewCartItemsController: cart: " + cartArray);
      logger.info("viewCartItemsController: finded cart:", cartArray);

      const cartItems = {
        email: req.session.email,
        products: cartArray,
        cartId: user.cart._id,
      };

      res.render("carrito", { cartItems, layout: "carrito" });
    } else {
      logger.error("viewCartItemsController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewCartItemsController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewUsersController = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { user } = req.session;
    if (user) {
      const { sessionID } = req.sessionID;
      logger.info("viewUsersController: SessionID:" + sessionID);
      const usersPag = await usersServices.getUsersService();
      logger.info("viewUsersController: finded users:", usersPag);

      const usersPaginate = {
        user: user,
        email: req.session.email,
        usersPag: usersPag,
      };
      logger.info("viewUsersController: finded users:", usersPaginate);
      res.render("users", { usersPaginate, layout: "users" });
    } else {
      logger.error("viewUsersController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewUsersController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewProductsCookiesController = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const user = req.user;
    if (user) {
      logger.info("viewProductsCookiesController: user cookie:", user);
      const productsPag = await productsServices.getProductsService(5, page);
      logger.info(
        "viewProductsCookiesController: finded products:",
        productsPag
      );
      const productsPaginate = {
        user: user.first_name + " " + user.last_name,
        productsPag: productsPag,
      };
      logger.info(
        "viewProductsCookiesController: finded products paginate:",
        productsPaginate
      );
      res.render("productsJWT", { productsPaginate, layout: "products" });
    } else {
      logger.error("viewProductsCookiesController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewProductsCookiesController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewChatController = async (req, res) => {
  logger.info("viewChatController: executed chat view");
  res.render("chat", { layout: "chat" });
};

export const viewProductsRealTimeController = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  logger.info(
    "viewProductsRealTimeController: executed products realtime view"
  );
  res.render("realTimeProducts", { products, layout: "realTime" });
};

export const viewProductsRealTime2Controller = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  logger.info(
    "viewProductsRealTime2Controller: executed productos realtime2 view"
  );
  res.render("realTimeProducts2", { products, layout: "altaProducto" });
};

export const deleteProductsRealTime2Controller = async (req, res) => {
  logger.info(
    "deleteProductsRealTime2Controller: executed delete realtime view"
  );
  res.render("realTimeProductsDelete", { layout: "deleteProduct" });
};

export const modifyProductsRealTime2Controller = async (req, res) => {
  logger.info(
    "modifyProductsRealTime2Controller: executed modify realtime view"
  );
  res.render("realTimeProductsModify", { layout: "modifyProduct" });
};

export const viewListProductsController = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  logger.info("viewListProductsController: executed list products view");
  res.render("home", { products, layout: "home" });
};

export const viewGetUpFileDocumentsController = async (req, res, next) => {
  logger.info("viewGetUpFileController: executed view getup file view");
  res.render("upfile_documents", { layout: "upfile" });
};

export const viewGetUpFileProductsController = async (req, res, next) => {
  logger.info("viewGetUpFileProductsController: executed view getup file view");
  res.render("upfile_products", { layout: "upfile" });
};

export const viewGetUpFileController = async (req, res, next) => {
  logger.info("viewGetUpFileController: executed view getup file view");
  res.render("upfile", { layout: "upfile" });
};

export const viewPutUpFileController = async (req, res, next) => {
  let pagina =
    "<!doctype html><html><head></head><body>" +
    "<p>Se subieron las fotos</p>" +
    '<br><a href="/">MENU</a></body></html>'
  logger.info("viewPutUpFileDocumentsController: executed put up file view");
  res.send(pagina);
};

export const putUpFileProductsController = async (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
};

export const viewGetUpFileProfilesController = async (req, res, next) => {
  logger.info("viewGetUpFileProfilesController: executed view getup file view");
  res.render("upfile_profiles", { layout: "upfile" });
};

export const putUpFileProfilesController = async (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
};

export const viewPutUpFileDocumentsController = async (req, res, next) => {
  const id_ = req.session.id_;
  const add = req.session.add;
  const edc = req.session.edc;

  console.log("Archivo id_", id_);
  console.log("Archivo add", add);
  console.log("Archivo edc", edc);

  const uid = req.session.email;

  logger.info("viewPutUpFileDocumentsController: email: ", uid);

  const docs = {
    id_doc: id_,
    address: add,
    edc: edc,
  };

  logger.info("viewPutUpFileDocumentsController: docs: ", docs);

  const user = await usersServices.setDocumentsService(uid, docs);

  console.log("USER USER", user);

  let pagina =
    "<!doctype html><html><head></head><body>" +
    "<p>Se subieron las fotos</p>" +
    '<br><a href="/">MENU</a></body></html>' +
  logger.info("viewPutUpFileDocumentsController: executed put up file view");
  res.send(pagina);
};

export const viewCartByIdController = async (req, res) => {
  try {
    const { cid } = req.params;

    if (cid === "") {
      logger.error(
        "viewCartByIdController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "missing input parameters"
      );
    }

    const cart = await cartsServices.getCartByIdService(cid);
    if (cart) {
      logger.info("viewCartByIdController: finded cart", cart);
      res.render("carts", { cart, layout: "carts" });
    } else {
      logger.warning("viewCartByIdController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewCartByIdController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewCheckoutController = async (req, res,next) => {
  try {

    const user = await usersServices.getUserByIdService(req.session.email);
    console.log("USER: ", user)
    if (!user) {
      logger.error("viewCheckoutController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }

    console.log("viewCheckoutController: userCart ID: ", user.cart._id);
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    if (!cart) {
      logger.error("viewCheckoutController : cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }

    logger.info("viewCheckoutController: cart empty: ", cart.products);
    if (cart.products.length == 0) {
      logger.error("viewCheckoutController: cart is empty");
      CustomError(
        ErrorsName.CART_EMPTY,
        ErrorsCause.CART_EMPTY,
        ErrorsMessage.CART_EMPTY,
        500,
        "cart empty"
      );
    } else {
      console.log("proceso de stripe")
      res.status(200).json({mensaje: "Proceso de stripe"})
    }
  } catch (error) {
    logger.fatal("Error in viewCheckoutController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
