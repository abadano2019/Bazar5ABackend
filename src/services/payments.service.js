import Stripe from "stripe";
import config from "../config.js";

class PaymentsServices {
  #stripe;

  constructor() {
    this.#stripe = Stripe(config.STRIPE_BACK_KEY);
  }

  createPaymentStripService = async (amount) => {
    try {
      const stripInfo = {
        amount: amount,
        currency: "usd",
        automatic_payment_method:{
            enable:true,
        },
      };

      const responseStripe = await this.#stripe.paymentIntents.create(
        stripInfo
      );
      console.log("**************",responseStripe)
      return responseStripe;
    } catch (error) {
        console.log(error)
    }
  };

  createPaymentMLService = async () => {
    try {
    } catch (error) {}
  };
}

export default new PaymentsServices();
