import Factory from "../persistence/factory.js";
import cartDTOPersistence from "../persistence/DTOs/carts.DTO/cartDTOPersistence.js";
import cartDTOResponse from "../persistence/DTOs/carts.DTO/cartDTOResponse.js";
import mongoose from "mongoose";

class CartsRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    const cartDAO = factory.getCartsDAO();
    this.#dao = cartDAO;
  }

  getCartsRepository = async () => {
    try {
      const carts = await this.#dao.getCarts();
      const cartsResponse = [];
      carts.forEach((cart) => {
        const cartResponse = new cartDTOResponse(cart);
        cartsResponse.push(cartResponse);
      });
      return cartsResponse;
    } catch (error) {}
  };

  getCartByIdRepository = async (idCart) => {
    try {
      //console.log("idCart: " + idCart);
      //const cid = mongoose.Types.ObjectId(idCart)
      const cart = await this.#dao.getCartById(idCart);
      console.log(cart);
      const cartResponse = new cartDTOResponse(cart);
      return cartResponse;
    } catch (error) {}
  };

  addCartRepository = async () => {
    try {
      const cartPersistence = new cartDTOPersistence();
      const newCart = await this.#dao.addCart(cartPersistence);
      console.log("NEW CART", newCart);
      return newCart;
    } catch (error) {}
  };

  addProductCartRepository = async (cid, pid) => {
    try {
      return await this.#dao.addProductCart(cid, pid);
    } catch (error) {}
  };

  deleteCartRepository = async (idCart) => {
    try {
      return await this.#dao.deleteCart(idCart);
    } catch (error) {}
  };

  deleteProductCartRepository = async (cid, pid) => {
    try {
      return await this.#dao.deleteProductCart(cid, pid);
    } catch (error) {}
  };

  deleteProductsCartRepository = async (cid) => {
    try {
      return await this.#dao.deleteProductsCart(cid);
    } catch (error) {}
  };

  updateCartProductRepository = async (cid, products) => {
    try {
      return await this.#dao.updateCartProduct(cid, products);
    } catch (error) {}
  };

  updateCartProductQuantityRepository = async (cid, pid, cantidad) => {
    try {
      return await this.#dao.updateCartProductQuantity(cid, pid, cantidad);
    } catch (error) {}
  };
}

export default new CartsRepository();
