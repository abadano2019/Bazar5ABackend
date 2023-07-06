import Product from "../../../../js/product.js";
import mongoose from "mongoose";
import { productsModel } from "../../../mongodb/models/products.model.js";

export default class ProductsManager {
  async getProducts_() {
    try {
      const productsDB = await productsModel.find().lean();
      return productsDB;
    } catch (error) {
      console.log("Error: GetProducts", error);
    }
  }

  getProducts = async (limit, page, query, sort) => {
    try {
      console.log(query);
      let typeQuery = "";
      let dataQuery = "";
      let dataSort = "";
      let querySelector = "";
      if (query?.stock) {
        typeQuery = "stock";
        dataQuery = `&stock=${query.stock}}`;
        querySelector = { stock: { $gt: query.stock } };
      }

      if (query?.category) {
        typeQuery = "category";
        dataQuery = `&category=${query.category}`;
        querySelector = { category: query.category };
      }

      console.log(querySelector);

      if (sort) {
        dataSort = `&sort=${sort}`;
      }

      const options = {
        page: page,
        limit: limit,
        lean: true,
        sort: sort ? { precio: sort } : "",
      };

      //const queryParams = data

      const productsDB = await productsModel.paginate(querySelector, options);

      const queryResponse = {
        status: "success",
        payload: productsDB.docs,
        totalPages: productsDB.totalPages,
        prevPage: productsDB.prevPage,
        nextPage: productsDB.nextPage,
        page: productsDB.page,
        hasPrevPage: productsDB.hasPrevPage,
        hasNextPage: productsDB.hasNextPage,
        prevLink: productsDB.hasPrevPage
          ? `http://localhost:3000/api/products/paginate?page=${productsDB.prevPage}&limit=${limit}${dataSort}${dataQuery}`
          : null,
        nextLink: productsDB.hasNextPage
          ? `http://localhost:3000/api/products/paginate?page=${productsDB.nextPage}&limit=${limit}${dataSort}${dataQuery}`
          : null,
      };
      return queryResponse;
    } catch (error) {
      const queryErrorResponse = {
        status: "error",
        descriptionError: error,
      };
      console.log("Error: GetProducts", error);
      return queryErrorResponse;
    }
  };

  getProductById = async (id) => {
    try {
      console.log("ID en el DAO : ", id)
      const productDB = await productsModel.findById(id);
      //const productDB = await productsModel.findOne({id:'63f4215cc86ffdd3d04dc124'});
      return productDB;
    } catch (error) {
      console.log("Error: GetProductsById", error);
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_ERROR,
        cause: ErrorsCause.PRODUCT_DATA_ERROR,
        message: ErrorsMessage.PRODUCT_DATA_ERROR,
      });
    }
  };

  dataTypeValidation(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
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
  }

  dataTypeValidationUpdate(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
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
  }

  createProduct(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
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
  }

  // Metodo que agrega un producto a la colección de productos almacenada en el archivo ubicado en la dirección
  // almacenada en el atributo path de la clase. El metodo recibe una instancia del objeto Product.
  addProduct = async (producto) => {
    // si el campo code no ha sido ingresado en ningun producto procedemos al alta en la colección
    try {
      if (producto) {
        const newProduct = await productsModel.create(producto);
        console.log("producto agregado");
        return "ADDPROD-COD2";
      } else {
        console.log("Producto invalido");
      }
    } catch (error) {
      console.log("Error en el alta de producto, Log detallado: ", error);
      return "ADDPROD-COD1";
    }
  };

  createProductPut(
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) {
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
  }

  updateProduct = async (id, producto) => {
    if (!id) {
      console.log("ATENCION: Debe ingresar un id valido");
      return "ATENCION: Debe ingresar un id valido";
    }

    if (!producto) {
      console.log("Atención: no se encuentran los datos de modificación");
      return "Atención: no se encuentran los datos de modificación";
    } else {
      try {
        const prod = await productsModel.findById(id);

        if (!prod) {
          console.log("Producto a modificar no existe");
          return "Producto a modificar no existe";
        }

        /*if(this.#validarCode(productos, producto.code)){
          console.log("Error: Codigo a modificar ya existe en otro producto")
          return "Error: Codigo a modificar ya existe en otro producto"
        }*/

        prod.title =
          producto.title !== "" && producto.title !== undefined
            ? producto.title
            : prod.title;
        prod.description =
          producto.description !== "" && producto.description !== undefined
            ? producto.description
            : prod.description;
        prod.price =
          producto.price !== "" && producto.price !== undefined
            ? producto.price
            : prod.price;
        prod.thumbnails =
          producto.thumbnails && producto.thumbnails !== undefined
            ? producto.thumbnails
            : prod.thumbnails;
        prod.code =
          producto.code !== "" && producto.code !== undefined
            ? producto.code
            : prod.code;
        prod.stock =
          producto.stock !== "" && producto.stock !== undefined
            ? producto.stock
            : prod.stock;
        prod.status =
          producto.status !== "" && producto.status !== undefined
            ? producto.status
            : prod.status;
        prod.category =
          producto.category !== "" && producto.category !== undefined
            ? producto.category
            : prod.category;
        console.log(prod);
        /*const prodUpd = await productsModel.findOneAndUpdate(id, {description: prod.description,
                                                                  title: prod.title,
                                                                  price: prod.price,
                                                                  thumbnails: prod.thumbnails,
                                                                  code: prod.code,
                                                                  stock: prod.stock,
                                                                  status: prod.status,
                                                                  category: prod.category}, {new:true})*/
        await prod.save();
        //console.log("Producto Modificado:", prodUpd)
        console.log("producto modificdo");
        return "OK";
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Metodo que elimina un producto de la colección de productos almacenada en el archivo ubicado
  // en la dirección del atributo path de la clase, recibe el id del producto a ser eliminado.
  deleteProduct = async (id) => {
    if (!id) {
      console.log("ATENCION: Debe ingresar un id valido");
      return;
    }

    try {
      const producto = await productsModel.findByIdAndDelete(id);
      console.log("producto eliminado");
      return producto;
    } catch (error) {
      console.log("Error al borrar registro, Log Detallado:", error);
    }
  };

  updateStock = async (id, stock) => {
    try {
      const prod = await productsModel.findById(id);
      prod.stock = stock;
      await prod.save();
    } catch (error) {
      console.log(error);
    }
  };
}
