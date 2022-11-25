import Stripe from "stripe";
import * as Sentry from "@sentry/nextjs";
const stripeSecret = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  if (req.method === "POST") {
    const { items, cupon } = req.body;
    console.log("---------------", cupon);
    let total = 0;
    items.map((e) => {
      let transformado = parseFloat(e.price).toFixed(2);
      console.log(transformado);
      total = parseFloat(total) + parseFloat(transformado);
    });
    total = parseFloat(total).toFixed(2);
    if (cupon.tipo === "porcentaje") {
      let descuento = total * cupon.descuento;
      total = total - descuento;
      total = parseFloat(total).toFixed(2);
      console.log("rt", total);
    } else {
      total = total - cupon.descuento;
      total = parseFloat(total).toFixed(2);
      console.log("rtf", total);
    }
    if (total < 50) {
      total = parseFloat(total) + 4.95;
    }
    try {
      const payment = await stripeSecret.paymentIntents.create({
        amount: parseFloat(total) * 100,
        currency: "eur",
      });

      return await res.status(200).json({
        client_secret: payment.client_secret,
      });
    } catch (error) {
      Sentry.captureException(error);
      console.log(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
