import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import Product from "../js/product.js";
import logger from "../logger/winston.js";
import productsServices from "../services/products.service.js";
import { socketServer } from "../app.js";
import { transporter } from "../nodemailer.js";
import usersServices from "../services/users.service.js";

export const getProductsController = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, ...query } = req.query;
    const products = productsServices.getProductsService(
      limit,
      page,
      query,
      sort
    );
    res.json({ message: "productos encontrado:", products });
  } catch (error) {
    logger.fatal("Error in getProductsController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await productsServices.getProductByIdService(idProduct);

    if (product) {
      res.json({ mesage: "Producto encontrado", product });
    } else {
      res.json({ mesage: "Producto no encontrado" });
    }
  } catch (error) {
    logger.fatal("Error in getProductByIdController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const getProducts_Controller = async (req, res, next) => {
  const { limit } = req.query;
  try {
    const products = await productsServices.getProducts_Service();

    if (limit) {
      const productSlice = products.slice(0, limit);
      res.json({ message: "productos encontrado:", productSlice });
    } else {
      res.json({ message: "productos encontrado:", products });
    }
  } catch (error) {
    logger.fatal("Error in getProducts_Controller, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const addProductController = async (req, res, next) => {
  try {
    console.log(req.body);
    let {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    } = req.body;

    const owner = req.session.email;
    console.log("Owner: ", owner);

    const priceInt = parseInt(price);
    const stockInt = parseInt(stock);
    const statusBool = Boolean(status);
    if (typeof title !== "string" || title === "") {
      logger.warning("addProductController: Title string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Title string datacamp"
      );
    }
    if (typeof description !== "string" || description === "") {
      logger.warning("addProductController: description string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Description string datacamp"
      );
    }
    if (typeof code !== "string" || code === "") {
      logger.warning("addProductController: code string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Code string datacamp"
      );
    }
    if (typeof category !== "string" || category === "") {
      logger.warning("addProductController: category string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Category string datacamp"
      );
    }
    if (typeof priceInt !== "number" || priceInt === "") {
      logger.warning("addProductController: price numeric datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Price numeric datacamp"
      );
    }
    if (typeof stockInt !== "number" || stockInt === "") {
      logger.warning("addProductController: stock numeric datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Price numeric datacamp"
      );
    }
    if (typeof statusBool !== "boolean" || statusBool === "") {
      logger.warning("addProductController: status boolean datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Status boolean datacamp"
      );
    }

    if (thumbnails === undefined) {
      thumbnails = [];
    }

    const product = new Product(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
      owner
    );

    const cod = await productsServices.addProductService(product);
    logger.info("addProductController: Control flag: " + cod);
    if (cod === "ADDPROD-COD1") {
      logger.warning(
        "addProductController: primary key restriction code product already exist"
      );
      res.json({
        mesage:
          "ATENCION: Verifique el campo Code, el mismo ya existe en otro producto",
      });
    } else {
      if (cod === "ADDPROD-COD2") {
        const products = await productsServices.getProductsService();
        socketServer.emit("productoAgregado", { products });
        logger.info("addProductController: product added", product);
        res.json({ mesage: "Producto agregado: ", product });
      }
    }
  } catch (error) {
    logger.fatal("Error in addProductController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;

    if (typeof title !== "string" && title !== undefined) {
      logger.warning("updateProductController: Title string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Title string datacamp"
      );
    }
    if (typeof description !== "string" && description !== undefined) {
      logger.warning("updateProductController: description string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Description string datacamp"
      );
    }
    if (typeof code !== "string" && code !== undefined) {
      logger.warning("updateProductController: Code string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Code string datacamp"
      );
    }
    if (typeof category !== "string" && category !== undefined) {
      logger.warning("updateProductController: category string datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Category string datacamp"
      );
    }
    if (typeof Number(price) !== "number" && price !== undefined) {
      logger.warning("updateProductController: price numeric datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        500,
        "Price number datacamp"
      );
    }
    if (typeof Number(stock) !== "number" && stock !== undefined) {
      logger.warning("updateProductController: stock numeric datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        500,
        "Stock number datacamp"
      );
    }
    if (typeof Boolean(status) !== "boolean" && status !== undefined) {
      logger.warning("updateProductController: status boolean datacamp");
      CustomError(
        ErrorsName.DATA_TYPE_BOOLEAN_ERROR,
        ErrorsCause.DATA_TYPE_BOOLEAN_ERROR,
        ErrorsCause.DATA_TYPE_BOOLEAN_ERROR,
        500,
        "Status boolean datacamp"
      );
    }
    if (!Array.isArray(thumbnail) && thumbnail !== undefined) {
      logger.warning("updateProductController: thumbnail array type");
      CustomError(
        ErrorsName.DATA_TYPE_ERROR,
        ErrorsCause.DATA_TYPE_ERROR,
        ErrorsCause.DATA_TYPE_ERROR,
        500,
        "Thumbnails array type"
      );
    }
    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );

    const modifyProduct = await productsServices.getProductByIdService(
      idProduct
    );
    if (modifyProduct) {
      const validation = await productsServices.updateProductService(
        idProduct,
        product
      );
      logger.info("updateProductController: product modified");
      res.json("Producto modificado");
    } else {
      logger.warning("updateProductController: product not exist");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in updateProductController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    if (idProduct.length < 24) {
      logger.error("deleteProductController:  invalid idProudct");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        500,
        "Product Id not exist"
      );
    }
    const product = await productsServices.getProductByIdService(idProduct);
    const user = await usersServices.getUserByIdService(req.session.email);
    logger.info("deleteProductController: user session:", req.session.email);

    if (product) {
      const owner = await productsServices.getProductOwner(product.id);
      logger.info("deleteProductController: product owner: " + owner);
      if (user.role === "premium") {
        if (owner === req.session.email) {
          await productsServices.deleteProductService(idProduct);
          const mail = await transporter.sendMail({
            from: "BAZAR 5A",
            to: user.email,
            subject: "Product eliminado",
            text: `Estimado Usuario: El producto ${product.title} creado por usted, correspondiente al sitio Bazar5A ha sido eliminado`,
          });
          logger.info(`cleanUsersService: Sended mail to" ${user.email}`);
          const products = await productsServices.getProductsService();
          socketServer.emit("productoEliminado", { products });
          logger.info(
            "deleteProductController: deleted product - user permium",
            product
          );
          res.json({ mesage: "Producto eliminado", product });
        } else {
          logger.warning("deleteProductController: product owner not valid");
          CustomError(
            ErrorsName.PRODUCT_OWNER_ERROR,
            ErrorsCause.PRODUCT_OWNER_ERROR,
            ErrorsMessage.PRODUCT_OWNER_ERROR,
            500,
            "Product owner not valid"
          );
        }
      } else {
        await productsServices.deleteProductService(idProduct);
        const mail = await transporter.sendMail({
          from: "BAZAR 5A",
          to: user.email,
          subject: "Product eliminado",
          text: `Estimado Usuario: El producto ${product} creado por usted, correspondiente al sitio Bazar5A ha sido eliminado`,
        });

        const products = await productsServices.getProductsService();
        socketServer.emit("productoEliminado", { products });
        logger.info(
          "deleteProductController: deleted product - user admin",
          product
        );
        res.json({ mesage: "Producto eliminado", product });
      }
    } else {
      logger.warning("deleteProductController: product not exist");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in deleteProductController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
