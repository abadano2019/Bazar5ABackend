import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import cartsServices from "../services/carts.service.js";
import logger from "../logger/winston.js";
import productsServices from "../services/products.service.js";
import ticketsServices from "../services/tickets.service.js";
import { transporter } from "../nodemailer.js";
import usersServices from "../services/users.service.js";

export const getTicketsByUserController = async (req, res, next) => {
  try {
    const ticket = await ticketsServices.getTicketByUserService();
    logger.info("getTicketsByUserController: tickets displayed", ticket);
    res.json(ticket);
  } catch (error) {
    logger.fatal("Error in getTicketsByUserController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const addTicketController = async (req, res, next) => {
  try {
    //const { cid } = req.params;

    const user = await usersServices.getUserByIdService(req.session.email);
    if (!user) {
      logger.error("addTicketController: user not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }

    console.log("userCart ID: ", user.cart._id);
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    if (!cart) {
      logger.error("addTicketController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }
    logger.info("addTicketController: cart empty: ", cart.products);
    if (cart.products.length == 0) {
      logger.error("addTicketController: cart is empty");
      CustomError(
        ErrorsName.CART_EMPTY,
        ErrorsCause.CART_EMPTY,
        ErrorsMessage.CART_EMPTY,
        500,
        "cart empty"
      );
    } else {
      const date = new Date();
      const datetime = date.toLocaleString();
      const code = date.getTime();
      const carts = await cartsServices.checkProductsCart(cart.products);

      const amount = await cartsServices.sumItemsCarts(carts[0]);

      const ticket = {
        code: code.toString(),
        purchase_datetime: datetime,
        amount: amount,
        purchaser: req.session.email,
        items: carts[0],
      };

      logger.info("addTicketController: created ticket", ticket);

      const newTicket = await ticketsServices.addTicketService(ticket);
      const newCart = await cartsServices.updateCartProductService(
        user.cart._id,
        carts[1]
      );

      console.log("CARTS 0: ", carts[0]);
      console.log("CARTS 1: ", carts[1]);
      logger.info("addTicketController: buyed cart: ", carts[0]);
      logger.info("addTicketController: user cart: ", carts[1]);

      const mail = await transporter.sendMail({
        from: "BAZAR 5A",
        to: req.session.email,
        subject: "Detalle de pedido de compra",
        text: `Se ha realizado la compra exitosamente para los siguientes productos: ${JSON.stringify(
          carts[0]
        )}. \n \n Lamentablemente por falta de stock los siguientes productos aún permanecen es su carrito: ${JSON.stringify(
          carts[1]
        )}`,
      });

      logger.info(`addTicketController: sended mail`);
      //res.json({ mesage: "Compra realizada" });
      res.status(200).json("compra realizada");
    }
  } catch (error) {
    logger.fatal("Error in addTicketController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const addTicketStripeController = async (req, res, next) => {
  try {
    //const { cid } = req.params;

    const user = await usersServices.getUserByIdService(req.session.email);
    if (!user) {
      logger.error("addTicketController: user not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }

    console.log("userCart ID: ", user.cart._id);
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    if (!cart) {
      logger.error("addTicketController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }

    const date = new Date();
    const datetime = date.toLocaleString();
    const code = date.getTime();
    const carts = await cartsServices.checkProductsCart(cart.products);
    if (carts.length == 0) {
      res.status(403).json("Empty cart");
    }
    const amount = await cartsServices.sumItemsCarts(carts[0]);

    const ticket = {
      code: code.toString(),
      purchase_datetime: datetime,
      amount: amount,
      purchaser: req.session.email,
      items: carts[0],
    };

    logger.info("addTicketController: created ticket", ticket);

    const newTicket = await ticketsServices.addTicketService(ticket);
    const newCart = await cartsServices.updateCartProductService(
      user.cart._id,
      carts[1]
    );

    console.log("CARTS 0: ", carts[0]);
    console.log("CARTS 1: ", carts[1]);
    logger.info("addTicketController: buyed cart: ", carts[0]);
    logger.info("addTicketController: user cart: ", carts[1]);

    const mail = await transporter.sendMail({
      from: "BAZAR 5A",
      to: req.session.email,
      subject: "Detalle de pedido de compra",
      text: `Se ha realizado la compra exitosamente para los siguientes productos: ${JSON.stringify(
        carts[0]
      )}. \n \n Lamentablemente por falta de stock los siguientes productos aún permanecen es su carrito: ${JSON.stringify(
        carts[1]
      )}`,
    });

    logger.info(`addTicketController: sended mail`);
    //res.json({ mesage: "Compra realizada" });
    //res.status(200).json("compra realizada")
  } catch (error) {
    logger.fatal("Error in addTicketController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
