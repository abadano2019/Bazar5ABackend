import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import cartsServices from "../services/carts.service.js";
import logger from "../logger/winston.js";
import mongoose from "mongoose";
import productsServices from "../services/products.service.js";
import usersServices from "../services/users.service.js";

export const getCartsController = async (req, res, next) => {
  const { limit } = req.query;
  console.log(limit);
  try {
    const carts = await cartsServices.getCartsService();
    logger.info("getCartsController: carts finded", carts);
    if (limit) {
      const cartSlice = carts.slice(0, limit);
      logger.info(
        "getCartsController:  finded carts (response with limit)",
        carts
      );
      res.json({ message: "Carritos encontrados:", cartSlice });
    } else {
      logger.info(
        "getCartsController:  finded carts (response no limit)",
        carts
      );
      res.json({ message: "Carritos encontrados:", carts });
    }
  } catch (error) {
    logger.fatal("Error in getCartsController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const getCartByIdController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    console.log("id de cart para el controlador byId: " + cid)
    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      const cartProducts = cart.cartProducts;
      if (cartProducts && cartProducts.length > 0) {
        logger.info(
          "getCartByIdController:  cart products finded: ",
          cartProducts
        );
        res.json({ mesage: "Productos del carrito: ", cartProducts });
      } else {
        logger.warning("getCartByIdController:  cart without products ");
        res.json({ mesage: "Carrito sin productos" });
      }
    } else {
      logger.warning("getCartByIdController:  cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in getCartByIdController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const addCartController = async (req, res, next) => {
  try {
    const cart = await cartsServices.addCartService();
    logger.info("addCartController: added cart", cart);
    res.json({ mesage: "Carrito agregado", cart });
  } catch (error) {
    logger.fatal("Error in addCartController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const addProductToCartController = async (req, res, next) => {
  try {
    let { pid } = req.params;
    logger.info("Id product: " + pid);
    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      logger.warning("addProductToCartController: product not exist");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    logger.info("addProductToCartController: email: " + req.session.email);
    const user = await usersServices.getUserByIdService(req.session.email);
    logger.info("addProductToCartController: user finded: ", user);
    logger.info("addProductToCartController: user cart id: " + user.cart._id);
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    logger.info("addProductToCartController: user cart finded: ", cart);
    if (!cart) {
      logger.warning("addProductToCartController: cart not exist: ", cart);
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
      return;
    }
    await cartsServices.addProductCartService(cart.id, pid);
    logger.info("addProductToCartController: product added to user cart");
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    logger.fatal("Error in addProductToCartController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const subtractProductFromCartController = async (req, res, next) => {
  try {
    let { pid } = req.params;
    logger.info("Id product: " + pid);
    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      logger.warning("subtractProductFromCartController: product not exist");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    logger.info(
      "subtractProductFromCartController: email: " + req.session.email
    );
    const user = await usersServices.getUserByIdService(req.session.email);
    logger.info("subtractProductFromCartController: user finded: ", user);
    logger.info(
      "subtractProductFromCartController: user cart id: " + user.cart._id
    );
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    logger.info("subtractProductFromCartController: user cart finded: ", cart);
    if (!cart) {
      logger.warning(
        "subtractProductFromCartController: cart not exist: ",
        cart
      );
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
      return;
    }

    const cartProducts = user.cart.cartProducts;
    const cartArray = Object.values(cartProducts);
    let errorQuantity = false;
    cartArray.forEach(async (prod) => {
      let id_product = prod.id.toString();
      if (id_product === pid) {
        if (prod.quantity > 0) {
          await cartsServices.updateCartProductQuantityService(
            user.cart._id,
            pid,
            prod.quantity - 1
          );
          logger.info(
            "subtractProductFromCartController: product subtracted to user cart"
          );
          res.json({ mesage: "product quantity substacted" });
        }else{
          logger.info("subtractProductFromCartController: Whithout products, quantity = 0")
          errorQuantity = true;
        }
      }
    });
    
    if (errorQuantity){
      CustomError(
        ErrorsName.PRODUCT_DATA_QUANTITY,
        ErrorsCause.PRODUCT_DATA_QUANTITY,
        ErrorsMessage.PRODUCT_DATA_QUANTITY,
        505,
        "Product quantity equal tu zero"
      );
    }
  } catch (error) {
    logger.fatal(
      "Error in subtractProductFromCartController, Log detail:",
      error
    );
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const addProductCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    if (pid === "") {
      logger.error(
        "addProductCartController: id product input parameter is missing"
      );
      CustomError(
        ErrorsName.PRODUCT_DATA_ERROR,
        ErrorsCause.PRODUCT_DATA_ERROR,
        ErrorsMessage.PRODUCT_DATA_ERROR,
        500,
        "missing input parameters"
      );
    }

    if (cid === "") {
      logger.error(
        "addProductCartController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "missing input parameters"
      );
    }
    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      logger.warning("addProductCartController: product not exist");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    const cart = await cartsServices.getCartByIdService(cid);
    if (!cart) {
      logger.warning("addProductCartController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
      return;
    }
    await cartsServices.addProductCartService(cid, pid);
    logger.info("addProductCartController: product added");
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    logger.fatal("Error in addProductCartController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const deleteCartController = async (req, res, next) => {};

export const deleteProductCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    if (pid === "") {
      logger.error(
        "deleteProductCartController: id product input parameter is missing"
      );
      CustomError(
        ErrorsName.PRODUCT_DATA_ERROR,
        ErrorsCause.PRODUCT_DATA_ERROR,
        ErrorsMessage.PRODUCT_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    if (cid === "") {
      logger.error(
        "deleteProductCartController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.PRODUCT_DATA_ERROR,
        ErrorsCause.PRODUCT_DATA_ERROR,
        ErrorsMessage.PRODUCT_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      logger.warning("deleteProductCartController: product not exist");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      await cartsServices.deleteProductCartService(cid, pid);
      logger.info(
        "deleteProductCartController: cart finded, deleted product",
        cart
      );
      res.json({ mesage: "Carrito encontrado, producto borrado", cart });
    } else {
      logger.warning("deleteProductCartController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in deleteProductCartController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const deleteProductsCartController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    if (cid === "") {
      logger.error(
        "deleteProductsCartController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      await cartsServices.deleteProductsCartService(cid);
      logger.info(
        "deleteProductsCartController: cart finded, deleted all products",
        cart
      );
      res.json({
        mesage: "Carrito encontrado, se borraron todos los productos",
        cart,
      });
    } else {
      logger.warning("deleteProductsCartController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in deleteProductsCartController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const updateCartProductController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { cartProducts } = req.body;

    if (cid === "") {
      logger.error(
        "updateCartProductController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    if (cartProducts === "") {
      logger.error(
        "updateCartProductController: products cart input parameter is missing"
      );
      CustomError(
        ErrorsName.PRODUCT_ADD_ERROR,
        ErrorsCause.PRODUCT_ADD_ERROR,
        ErrorsMessage.PRODUCT_ADD_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const modifyProduct = await cartsServices.updateCartProductService(
      cid,
      cartProducts
    );
    logger.info("Product modify flag:", modifyProduct);
    if (modifyProduct === "OK") {
      logger.info("updateCartProductController: cart products modified");
      res.json({ mesage: "Carrito modificado" });
    } else {
      logger.error(
        "updateCartProductController: Error in cart products modified"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Contact to administrator - Error update cartProducts"
      );
    }
  } catch (error) {
    logger.fatal("Error in updateCartProductController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const updateCartProductQuantityController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    if (cid === "") {
      logger.error(
        "updateCartProductQuantityController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    if (pid === "") {
      logger.error(
        "updateCartProductQuantityController: id product input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    if (cantidad === "") {
      logger.error(
        "updateCartProductQuantityController: quantity input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const modifyProduct = await cartsServices.updateCartProductQuantityService(
      cid,
      pid,
      cantidad
    );
    logger.info("Product modify flag:", modifyProduct);
    if (modifyProduct === "OK") {
      logger.info(
        "updateCartProductQuantityController: cart products modified"
      );
      res.json({ mesage: "Producto modificado" });
    } else {
      logger.error(
        "updateCartProductQuantityController: Error in cart products modified"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Contact to administrator - Error update product quantity"
      );
    }
  } catch (error) {
    logger.fatal(
      "Error in updateCartProductQuantityController, Log detail:",
      error
    );
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
