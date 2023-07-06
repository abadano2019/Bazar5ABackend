import config from "../../../config.js";
import productsFileSystem from "./productsManager/productsFileSystem.js"
import productsMemory from "./productsManager/productsMemory.js";
import productsMongo from "./productsManager/productsMongo.js";
import productsSQL from "./productsManager/productsSQL.js";

export default class ProductDAO {
  #productsDAO;

  constructor(argv) {
    switch (argv) {
      case "fs":
        const path = config.FILE_REPOSITORY;
        this.#productsDAO = new productsFileSystem(path + "products.json");
        break;
      case "mongo":
        this.#productsDAO = new productsMongo();
        break;
      case "memory":
        this.#productsDAO = new productsMemory();
        break;
      case "sql":
        this.#productsDAO = new productsSQL();
        break;
      default:
        this.#productsDAO = new productsMongo();
        break;
    }
  }

  async getProducts_() {
    return await this.#productsDAO.getProducts_();
  }

  async getProducts(limit, page, query, sort) {
    return await this.#productsDAO.getProducts(limit, page, query, sort);
  }

  async getProductById(id) {
    return await this.#productsDAO.getProductById(id);
  }

  async addProduct(producto) {
    return await this.#productsDAO.addProduct(producto);
  }

  async updateProduct(id, producto) {
    return await this.#productsDAO.updateProduct(id, producto);
  }

  async deleteProduct(id) {
    return await this.#productsDAO.deleteProduct(id);
  }

  updateStock = async(id,stock) =>{
    await this.#productsDAO.updateStock(id,stock)
  }
}
