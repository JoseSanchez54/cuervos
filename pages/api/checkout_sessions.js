const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items } = req.body;

  const lineItems = [];
  items.map((i) => {
    lineItems.push({
      price_data: {
        currency: "EUR",
        unit_amount_decimal:
          i.sale_price !== "" ? i.sale_price * 1000 : i.regular_price * 100,
        product_data: {
          name: i.name,
          images: [i.images[0].src],
        },
      },
      quantity: lineItems.length + 1,
    });
  });
  console.log("/////////////////////////////", lineItems);

  if (req.method === "POST") {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions
      .create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      })
      .then((session) => {
        return session;
      });
    res.status(200).json(session);
  }
}
