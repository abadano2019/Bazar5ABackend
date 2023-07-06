import cartsFileSystem from "./cartsManager/cartsFileSystem.js";
import cartsMemory from "./cartsManager/cartsMemory.js";
import cartsMongo from "./cartsManager/cartsMongo.js";
import cartsSQL from "./cartsManager/cartsSQL.js";

export default class CartsDAO {
  #cartsDAO;

  constructor(argv) {
    switch (argv) {
      case "fs":
        const path = "src/data/";
        this.#cartsDAO = new cartsFileSystem(path + "carts.json");
        break;
      case "mongo":
        this.#cartsDAO = new cartsMongo();
        break;
      case "memory":
        this.#cartsDAO = new cartsMemory();
        break;
      case "sql":
        this.#cartsDAO = new cartsSQL();
        break;
      default:
        this.#cartsDAO = new cartsMongo();
        break;
    }
  }

  async getCarts() {
    return this.#cartsDAO.getCarts();
  }

  async getCartById(idCart) {
    return this.#cartsDAO.getCartById(idCart);
  }

  async addCart(cart) {
    return this.#cartsDAO.addCart(cart);
  }

  async addProductCart(cid, pid) {
    return this.#cartsDAO.addProductCart(cid, pid);
  }

  async deleteCart(idCart) {
    return this.#cartsDAO.deleteCart(idCart);
  }

  async deleteProductCart(cid, pid) {
    return this.#cartsDAO.deleteProductCart(cid, pid);
  }

  async deleteProductsCart(cid) {
    return this.#cartsDAO.deleteProductsCart(cid);
  }

  async updateCartProduct(cid, products) {
    return this.#cartsDAO.updateCartProduct(cid, products);
  }

  async updateCartProductQuantity(cid, pid, cantidad) {
    return this.#cartsDAO.updateCartProductQuantity(cid, pid, cantidad);
  }
}
