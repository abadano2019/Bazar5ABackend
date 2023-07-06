import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../../error/errors.enum.js";

import CartProducts from "../../../../js/cartProduct.js";
import CustomError from "../../../../error/CustomError.js";
import { cartsModel } from "../../../mongodb/models/carts.model.js";
import logger from "../../../../logger/winston.js";
import { mongoose } from "mongoose";
import { productsModel } from "../../../mongodb/models/products.model.js";

export default class CartsMemory {
  // Metodo que devuelve la colección de carritos almacenada en el archivo que se encuentra en la dirección
  // guardada en el atributo path de la clase. En caso de que el archivo aún no se haya creado devuelve un
  // arreglo vacio.
  async getCarts() {
    try {
      //your code
    } catch (error) {}
  }

  // Metodo que devuelve un carrito dado por un id de carrito, en caso de no existir en la colección el metodo
  // devuelve un mensaje "Error: Not Found" en caso contrario devuelve un mensaje con el id, el titulo y la
  // descripción por la consola además de devolver el objeto del carrito encontrado.
  async getCartById(idCart) {
    try {
    } catch (error) {}
  }

  // Metodo que crea un producto de carrito con la variable idProducto
  // se valida la no duplicación del campo code con productos ya ingresados a la colección, además de que los
  // campos ingresado existan y no sean vacios. En caso de cumplirse todos los anteriores supuestos el metodo
  // devuelte una instancia del objete Producto.
  createCartProduct(pid) {
    // crear cart
    try {
    } catch (error) {}
  }

  // Método para crear un carrito
  createCart() {
    // crear cart
    try {
    } catch (error) {}
  }

  // Metodo que agrega un carrito a la colección de carritos almacenada en el archivo ubicado en la dirección
  // almacenada en el atributo path de la clase. El metodo recibe una instancia del objeto cart.
  async addCart(cart) {
    try {
    } catch (error) {}
  }

  // Metodo para agregar un producto de carrito a un carrito
  async addProductCart(cid, pid) {
    try {
    } catch (error) {}
  }

  // Metodo que elimina un carrito de la colección de carritos almacenada en el archivo ubicado
  // en la dirección del atributo path de la clase, recibe el id del producto a ser eliminado.
  async deleteCart(idCart) {
    try {
    } catch (error) {}
  }

  // Metodo para borrar un producto dado por parametro del carrito de compra
  async deleteProductCart(cid, pid) {
    try {
    } catch (error) {}
  }

  // Metodo para borrar un producto dado por parametro del carrito de compra
  async deleteProductsCart(cid) {
    try {
    } catch (error) {}
  }

  // METODO PUT - Actualiza el array del carrito entero por otro array
  async updateCartProduct(cid, products) {
    try {
    } catch (error) {}
  }

  async updateCartProductQuantity(cid, pid, cantidad) {
    try {
    } catch (error) {}
  }
}
