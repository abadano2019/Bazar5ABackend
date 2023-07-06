import { Router } from "express";
import Stripe from "stripe"
import { addTicketStripeController } from "../controllers/tickets.controller.js";
import config from "../config.js"
import logger from "../logger/winston.js";
import { paymentsStripeTicketController } from "../controllers/payments.controller.js";

const router = new Router();
const stripe = Stripe(config.STRIPE_BACK_KEY)
// Vista para ser utilizada con protocalo http, layout home,
//router.post("/payment-intents", paymentsStripeController, addTicketController);
router.post("/payIntent", paymentsStripeTicketController);


/*router.post("/payIntent", async (req, res,next) => {
  //const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10000,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});*/


export default router;
