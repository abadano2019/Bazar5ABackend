import logger from "../logger/winston.js"
import productsRepository from "../repositories/products.repository.js";

class ProductsServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getProductsService = async (limit, page, query, sort) => {
    try {
      const products = await this.#repository.getProductsRepository(
        limit,
        page,
        query,
        sort
      );
      return products;
    } catch (error) {}
  };

  getProducts_Service = async () => {
    try {
      const products = await this.#repository.getProducts_Repository();
      return products;
    } catch (error) {}
  };

  getProductByIdService = async (id) => {
    try {
      logger.info("getProductByIdService - service init - product id:" + id);
      const product = await this.#repository.getProductByIdRepository(id);
      logger.info("getProductByIdService - product finded: ", product);
      return product;
    } catch (error) {
      CustomError(
        ErrorsName.PRODUCT_DATA_ERROR,
        ErrorsCause.PRODUCT_DATA_ERROR,
        ErrorsMessage.PRODUCT_DATA_ERROR,
        500,
        "Contact Administrator - Service error"
      );
    }
  };

  addProductService = async (producto) => {
    try {
      const product = await this.#repository.addProductRepository(producto);
      return product;
    } catch (error) {}
  };

  updateProductService = async (id, producto) => {
    try {
      const product = await this.#repository.updateProductRepository(
        id,
        producto
      );
      return product;
    } catch (error) {}
  };

  deleteProductService = async (id) => {
    try {
      const product = await this.#repository.deleteProductRepository(id);
      return product;
    } catch (error) {}
  };

  updateStock = async (id, stock) => {
    try {
      await this.#repository.updateStock(id, stock);
    } catch (error) {}
  };

  getProductOwner = async (id) => {
    try {
      const product = await this.#repository.getProductByIdRepository(id);
      if(!product){
        logger.info("getProductOwner - product service - product not exist")
        CustomError(
          ErrorsName.PRODUCT_DATA_NO_EXIST,
          ErrorsCause.PRODUCT_DATA_NO_EXIST,
          ErrorsMessage.PRODUCT_DATA_NO_EXIST,
          500,
          "getProductOwner - product not exit"
        );
      }
      else{
        console.log(product)
        logger.info("getProductOwner - Product owner: " + product.owner)
        return product.owner
      }
    } catch (error) {
      logger.info("getProductOwner - product service - product not exist")
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };
}

export default new ProductsServices(productsRepository);
