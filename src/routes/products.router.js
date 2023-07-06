import {
  addProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  getProducts_Controller,
  updateProductController,
} from "../controllers/products.controller.js";
import { getAuthAdminPremiumSession, getAuthAdminSession } from "../middlewares/auth.middleware.js";

import { Router } from "express";
import { errorMiddleware } from "../middlewares/errors.middleware.js";

const router = Router();

// Busqueda de todos los productos y busqueda de productos filtrando por un limite pasado por query
router.get("/", getProducts_Controller)

// Busqueda de productos, paginación
router.get("/paginate", getProductsController);

// Busqueda de producto por id
router.get("/:idProduct", getProductByIdController)

// alta de producto
router.post("/",getAuthAdminPremiumSession, addProductController)

// modificación de producto
router.put("/:idProduct", getAuthAdminSession, updateProductController)

// eliminación de producto
router.delete("/:idProduct", getAuthAdminPremiumSession, deleteProductController)

export default router;
