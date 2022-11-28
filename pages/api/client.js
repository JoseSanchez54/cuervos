import Stripe from "stripe";
import * as Sentry from "@sentry/nextjs";
const stripeSecret = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  if (req.method === "POST") {
    const { items, cupon } = req.body;
    console.log(items);

    let total = 0;
    items.map((e) => {
      let transformado = parseFloat(e.price).toFixed(2);

      total = parseFloat(total) + parseFloat(transformado);
    });
    total = parseFloat(total).toFixed(2);
    if (cupon.tipo === "porcentaje") {
      let descuento = total * cupon.descuento;
      total = total - descuento;
      total = parseFloat(total).toFixed(2);
    } else if (cupon.tipo === "fijo") {
      total = total - cupon.descuento;
      total = parseFloat(total).toFixed(2);
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

      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
