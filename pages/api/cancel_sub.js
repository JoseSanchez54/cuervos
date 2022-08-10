import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const deleted = await stripe.subscriptions.del(req.body.sesionesSub);
  const wcSus = await WooCommerce.put("subscriptions/" + req.body.sus_id, data)
    .then((res) => res.data)
    .catch((error) => {});

  return res.status(200).json(deleted);
};
