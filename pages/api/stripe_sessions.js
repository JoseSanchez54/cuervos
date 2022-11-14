import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const sessions = await stripe.checkout.sessions.list({
    limit: 990,
  });
  return res.status(200).json(sessions);
};
