import cartsReposotory from "../repositories/carts.repository.js";
import productsServices from "./products.service.js";

class CartsServices {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  getCartsService = async () => {
    try {
      return await this.#repository.getCartsRepository();
    } catch (error) {}
  };

  getCartByIdService = async (idCart) => {
    try {
      return await this.#repository.getCartByIdRepository(idCart);
    } catch (error) {}
  };

  addCartService = async () => {
    try {
      const cart = await this.#repository.addCartRepository();
      return cart;
    } catch (error) {}
  };

  addProductCartService = async (cid, pid) => {
    try {
      return await this.#repository.addProductCartRepository(cid, pid);
    } catch (error) {}
  };

  deleteCartService = async (idCart) => {
    try {
      return await this.#repository.deleteCartRepository(idCart);
    } catch (error) {}
  };

  deleteProductCartService = async (cid, pid) => {
    try {
      return await this.#repository.deleteProductCartRepository(cid, pid);
    } catch (error) {}
  };

  deleteProductsCartService = async (cid) => {
    try {
      return await this.#repository.deleteProductsCartRepository(cid);
    } catch (error) {}
  };

  updateCartProductService = async (cid, products) => {
    try {
      return await this.#repository.updateCartProductRepository(cid, products);
    } catch (error) {}
  };

  updateCartProductQuantityService = async (cid, pid, cantidad) => {
    try {
      console.log("////////////////////////////////////////////////////////////////////////////")
      console.log("CID: ", cid)
      console.log("PID: ", pid)
      console.log("cantidad: ", cantidad)
      
      return await this.#repository.updateCartProductQuantityRepository(
        cid,
        pid,
        cantidad
      );
    } catch (error) {}
  };

  sumItemsCarts = async (cart) => {
    try {
      let total = 0;
      const products = await productsServices.getProducts_Service();
      await cart.forEach((cartProduct) => {
        let id = cartProduct.id._id.toString();
        let product = products.find((prod) => prod.id === id);
        total = total + product.price * cartProduct.quantity;
      });
      return total;
    } catch (error) {}
  };

  checkProductsCart = async (cart) => {
    try{
    let cartPurchase = [];
    let newCart = [];
    const products = await productsServices.getProducts_Service();

    for (let i = 0; i < cart.length; i++) {
      let id = cart[i].id._id.toString();
      let product = products.find((prod) => prod.id === id);
      if (product.stock >= cart[i].quantity) {
        cartPurchase.push(cart[i]);
        let stock = product.stock - cart[i].quantity;
        await productsServices.updateStock(id, stock);
      } else {
        newCart.push(cart[i]);
      }
    }
    return [cartPurchase, newCart];
  }catch(error){}
  };
}

export default new CartsServices(cartsReposotory);
