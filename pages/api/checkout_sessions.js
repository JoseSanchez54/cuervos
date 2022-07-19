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
  const data = {
    payment_method: "stripe",
    payment_method_title: "Stripe",
    set_paid: false,
    billing: {
      first_name: formulario.nombre,
      last_name: formulario.apellido,
      address_1: formulario.direccion,
      address_2: "",
      city: formulario.ciudad,
      state: formulario.provincia,
      postcode: formulario.cp,
      country: formulario.pais,
      email: formulario.email,
      phone: formulario.telefono,
    },
    shipping: {
      first_name: formulario.nombre,
      last_name: formulario.apellido,
      address_1: formulario.direccion,
      address_2: "",
      city: formulario.ciudad,
      state: formulario.provincia,
      postcode: formulario.cp,
      country: formulario.pais,
    },
    line_items: itemsWc,
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  };
  const lineItems = [];
  items.map((i) => {
    lineItems.push({
      price_data: {
        currency: "EUR",
        unit_amount_decimal:
          i.sale_price !== "" ? i.sale_price * 1000 : i.regular_price * 100,
        product_data: {
          name: i.name ? i.name : i.NombrePadre,
          images: i?.images ? [i?.images[0]?.src] : [i?.image?.src],
        },
      },
      quantity: lineItems.length + 1,
    });
  });

  if (req.method === "POST") {
    // Create Checkout Sessions from body params.
    WooCommerce.post("orders", data)
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
