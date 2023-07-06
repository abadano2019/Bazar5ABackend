import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import Stripe from "stripe";
import cartsServices from "../services/carts.service.js";
import config from "../config.js";
import logger from "../logger/winston.js";
import paymentsService from "../services/payments.service.js";
import ticketsServices from "../services/tickets.service.js";
import { transporter } from "../nodemailer.js";
import usersServices from "../services/users.service.js";

const stripe = Stripe(config.STRIPE_BACK_KEY);

/*export const paymentsStripeController = async (req, res, next) => {
    const paymentIntent = paymentsService.createPaymentStripService(1000);
    res.send({clientSecret: paymentIntent.client_secret})
    //res.json({message: "success", payload: response});
};*/

export const paymentsStripeController = async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 15000,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const paymentsStripeTicketController = async (req, res, next) => {
  try {
    const user = await usersServices.getUserByIdService(req.session.email);
    if (!user) {
      logger.error("paymentsStripeTicketController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }

    console.log("userCart ID: ", user.cart._id);
    const cart = await cartsServices.getCartByIdService(user.cart._id);
    if (!cart) {
      logger.error("paymentsStripeTicketController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }

    logger.info("paymentsStripeTicketController: cart empty: ", cart.products);
    if (cart.products.length == 0) {
      logger.error("paymentsStripeTicketController: cart is empty");
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

      if ((carts[0].length == 0) & (carts[1].length == 0)) {
      } else {
        const ticket = {
          code: code.toString(),
          purchase_datetime: datetime,
          amount: amount,
          purchaser: req.session.email,
          items: carts[0],
        };

        logger.info("paymentsStripeTicketController: created ticket", ticket);

        const newTicket = await ticketsServices.addTicketService(ticket);
        const newCart = await cartsServices.updateCartProductService(
          user.cart._id,
          carts[1]
        );

        console.log("CARTS 0: ", carts[0]);
        console.log("CARTS 1: ", carts[1]);
        logger.info("paymentsStripeTicketController: buyed cart: ", carts[0]);
        logger.info("paymentsStripeTicketController: user cart: ", carts[1]);

        const amountStripe = amount * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountStripe,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });

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

        logger.info(`paymentsStripeTicketController: sended mail`);
        //res.json({ mesage: "Compra realizada" });
        //res.status(200).json("compra realizada")
      }
    }
  } catch (error) {
    logger.fatal("Error in paymentsStripeTicketController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const paymentsMercadoLibreController = async (req, res, next) => {
  res.send("payments Mercado libre");
};
