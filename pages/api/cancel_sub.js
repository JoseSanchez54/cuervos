import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const subscription = await stripe.subscriptions.search({
    query: `customer:${req.query.customer}'`,
  });
  return res.status(200).json({ je: "hola" });
};
