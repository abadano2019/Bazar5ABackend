import Factory from "../persistence/factory.js";
import mongoose from "mongoose";
import productsDTOPersistence from "../persistence/DTOs/products.DTO/productDTOPersistence.js";
import productsDTOResponse from "../persistence/DTOs/products.DTO/productDTOResponse.js";
import productsDTOResponsePaginate from "../persistence/DTOs/products.DTO/productDTOResponsePaginate.js";

class ProductsRepository {
  #dao;

  constructor() {
    const factory = Factory.getInstance();
    const productDAO = factory.getProductsDAO();
    this.#dao = productDAO;
  }

  getProductsRepository = async (limit, page, query, sort) => {
    try {
      const products = await this.#dao.getProducts(limit, page, query, sort);
      const productsResponse = [];

      products.payload.forEach((product) => {
        const productResp = new productsDTOResponse(product);
        productsResponse.push(productResp);
      });
      const productsPaginate = new productsDTOResponsePaginate(products, productsResponse)
      return productsPaginate;
    } catch (error) {}
  };

  getProducts_Repository = async () => {
    try {
      const products = await this.#dao.getProducts_();
      const productsResponse = [];

      products.forEach((product) => {
        const productResp = new productsDTOResponse(product);
        productsResponse.push(productResp);
      });
      return productsResponse;
    } catch (error) {}
  };

  getProductByIdRepository = async (id) => {
    try {
      console.log("Entra en repository get product by id" + id)
      //logger.info("getProductByIdRepository - product id: " + id);
      const _id = new mongoose.Types.ObjectId(id);
      console.log("Id mongoose object id "+ _id)
      //logger.info("getProductByIdRepository - product ObjectId: ", _id);
      const product = await this.#dao.getProductById(_id);
      console.log("producto encontrado REPOSITORY")
      let productDTO = undefined;
      if (product) {
        productDTO = new productsDTOResponse(product);
      }
      return productDTO;
    } catch (error) {
    
    }
  };

  addProductRepository = async (producto) => {
    try {
      const productDTO = new productsDTOPersistence(producto);
      const product = await this.#dao.addProduct(productDTO);
      return product;
    } catch (error) {}
  };

  updateProductRepository = async (id, producto) => {
    try {
      const productDTO = new productsDTOPersistence(producto);
      const product = await this.#dao.updateProduct(id, productDTO);
      return product;
    } catch (error) {}
  };

  deleteProductRepository = async (id) => {
    try {
      const product = await this.#dao.deleteProduct(id);
      const productDTO = new productsDTOResponse(product);
      return productDTO;
    } catch (error) {}
  };

  updateStock = async (id, stock) => {
    try {
      await this.#dao.updateStock(id, stock);
    } catch (error) {}
  };
}

export default new ProductsRepository();
