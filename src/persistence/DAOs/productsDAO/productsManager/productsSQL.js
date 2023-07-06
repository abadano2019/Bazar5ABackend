import Product from "../../../../js/product.js";
import mongoose from "mongoose";
import { productsModel } from "../../../mongodb/models/products.model.js";

export default class ProductsSQLManager {
  async getProducts_() {
    try {
    } catch (error) {}
  }

  getProducts = async (limit, page, query, sort) => {
    try {
    } catch (error) {}

    getProductById = async (id) => {
      try {
      } catch (error) {}
    };

    dataTypeValidation = (
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    ) => {
      if (typeof title !== "string") {
        return "Title es un campo string";
      }

      if (typeof description !== "string") {
        return "Description es un campo string";
      }

      if (typeof code !== "string") {
        return "Code es un campo string";
      }

      if (typeof category !== "string") {
        return "Category es un campo string";
      }

      if (typeof price !== "number") {
        return "Price es un campo numerico";
      }

      if (typeof stock !== "number") {
        return "Stock es un campo numerico";
      }

      if (typeof status !== "boolean") {
        return "status es un campo booleano";
      }

      return "ok";
    };

    dataTypeValidationUpdate = (
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    ) => {
      if (typeof title !== "string" && title !== undefined) {
        return "Title es un campo string";
      }

      if (typeof description !== "string" && description !== undefined) {
        return "Description es un campo string";
      }

      if (typeof code !== "string" && code !== undefined) {
        return "Code es un campo string";
      }

      if (typeof category !== "string" && category !== undefined) {
        return "Category es un campo string";
      }

      if (typeof price !== "number" && price !== undefined) {
        return "Price es un campo numerico";
      }

      if (typeof stock !== "number" && stock !== undefined) {
        return "Stock es un campo numerico";
      }

      if (typeof status !== "boolean" && status !== undefined) {
        return "status es un campo booleano";
      }

      if (!Array.isArray(thumbnails) && thumbnails !== undefined) {
        return "Thumbnails es un campo que recibe un array";
      }

      return "OK";
    };

    createProduct = (
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    ) => {
      // validación de los campos para que no sean undefined, compos obligatorios
      /* if((!title) || (!description) || (!price) || (!code) || (!stock) || (!status) || (!category) ){
          console.log('Atención: Los campos del productos son obligatorios (title, description, price, thumbnails, code, stock,category)')
          return "Atención: Los campos del productos son obligatorios (title, description, price, thumbnails, code, stock,category"
        }*/

      // validación de los campos, se solicita que no sean vacios
      if (
        title === "" ||
        description === "" ||
        price === "" ||
        code === "" ||
        stock === "" ||
        status === "" ||
        category === ""
      ) {
        console.log(
          "Atención 4561: Verifique los campos a ingresar (title, description, price, thumbnails, code, stock, category)"
        );
        return "Atención: Verifique los campos a ingresar (title, description, price, thumbnails, code, stock, category)";
      }

      // crear producto
      if (thumbnails === undefined) {
        thumbnails = [];
      }
      const producto = new Product(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
      );
      return producto;
    };

    // Metodo que agrega un producto a la colección de productos almacenada en el archivo ubicado en la dirección
    // almacenada en el atributo path de la clase. El metodo recibe una instancia del objeto Product.
    addProduct = async (producto) => {
      // si el campo code no ha sido ingresado en ningun producto procedemos al alta en la colección
      try {
      } catch (error) {}
    };

    createProductPut = (
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    ) => {
      const producto = new Product(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
      );
      return producto;
    };

    updateProduct = async (id, producto) => {
      try {
      } catch (error) {}
    };
  };

  // Metodo que elimina un producto de la colección de productos almacenada en el archivo ubicado
  // en la dirección del atributo path de la clase, recibe el id del producto a ser eliminado.
  deleteProduct = async (id) => {
    try {
    } catch (error) {}
  };

  updateStock = async (id, stock) => {
    try {
    } catch (error) {}
  };
}
