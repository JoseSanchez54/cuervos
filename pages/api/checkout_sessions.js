const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import WooCommerce from "../../woocommerce/Woocommerce";
export default async function handler(req, res) {
  const { items, formulario } = req.body;
  const itemsWc = [];
  items.map((i) => {
    if (i.variable === false) {
      itemsWc.push({
        product_id: i.id,
        quantity: 1,
      });
    } else {
      itemsWc.push({
        product_id: i.id,
        variation_id: i.idPadre,
        quantity: 1,
      });
    }
  });

  const lineItems = [];
  await items.map((i) => {
    console.log("////////////////////////", i);
    lineItems.push({
      price_data: {
        currency: "EUR",
        unit_amount_decimal:
          i.sale_price !== "" ? i.sale_price * 100 : i.regular_price * 100,
        product_data: {
          name: i.nombrePadre,
          images: i?.images ? [i?.images[0]?.src] : [i?.image?.src],
        },
      },
      quantity: lineItems.length + 1,
    });
  });

  if (req.method === "POST") {
    // Create Checkout Sessions from body params.
    await WooCommerce.post("orders", formulario)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
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