import {
  addCartController,
  addProductCartController,
  addProductToCartController,
  deleteProductCartController,
  deleteProductsCartController,
  getCartByIdController,
  getCartsController,
  subtractProductFromCartController,
  updateCartProductController,
  updateCartProductQuantityController,
} from "../controllers/carts.controller.js";

import { Router } from "express";
import{
  addTicketController
} from "../controllers/tickets.controller.js"

const router = Router();

// Busqueda de todos los productos y busqueda de productos filtrando por un limite pasado por query
router.get("/", getCartsController);

// Busqueda de productos por id de carrito
router.get("/:cid", getCartByIdController);

// Alta de carrito
router.post("/", addCartController)

// Se redirecciona al endpoint /:cid/products/:pid
router.post("/addToCart/product/:pid", addProductToCartController)

// Se redirecciona al endpoint /:cid/products/:pid
router.post("/subtractFromCart/product/:pid", subtractProductFromCartController)

// Alta de producto a un carrito, debe existir el carrito y debe existir el producto en el archivo de productos
router.post("/:cid/products/:pid", addProductCartController)

// Borrado de un producto dado por parametro del carrito de compra
router.delete("/:cid/products/:pid", deleteProductCartController)

// Borrado de todos los productos de un carrito de compra
router.delete("/:cid", deleteProductsCartController)

// modificación del arreglo de productos de un carrito
router.put("/:cid", updateCartProductController)

// modificación de la cantidad de un producto de un carrito
router.put("/:cid/products/:pid", updateCartProductQuantityController)

// compra realizada sobre el carrito del usuario
router.post("/purchase", addTicketController)

// compra realizada sobre el carrito del usuario
//router.post("/:cid/purchase", purchaseCartController)

export default router;
