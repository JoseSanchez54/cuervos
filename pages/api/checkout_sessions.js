const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import WooCommerce from "../../woocommerce/Woocommerce";
import dateFormat from "dateformat";
export default async function handler(req, res) {
  const { items, formulario, envio, cupon, sessionID } = req.body;

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
  let periodico = "";
  let intervalo = "";

  const lineItems = [];
  const lineItemsWC = [];
  let sus = false;
  await items.map((i) => {
    const metadata = Object?.values(i?.meta_data).map((key) => {
      return key;
    });

    if (i.type === "subscription") {
      periodico = metadata?.filter((m) => m.key === "_subscription_period")[0]
        ?.value;
      intervalo = metadata?.filter(
        (m) => m.key === "_subscription_period_interval"
      )[0]?.value;
      sus = true;
      lineItems.push({
        price_data: {
          currency: "EUR",
          recurring: {
            interval: periodico,
            interval_count: intervalo,
          },
          unit_amount_decimal:
            i.sale_price !== "" ? i.sale_price * 100 : i.regular_price * 100,
          product_data: {
            name: i.nombrePadre,
            images: i?.images ? [i?.images[0]?.src] : [i?.image?.src],
          },
        },
        quantity: 1,
      });
    } else {
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

        quantity: 1,
      });
    }
  });
  lineItems.push({
    price_data: {
      currency: "EUR",
      unit_amount_decimal: envio * 100,
      product_data: {
        name: "Envio",
        images: [
          "https://apicuervos.bitmac.es/wp-content/uploads/2022/07/envio.jpg",
        ],
      },
    },
    quantity: 1,
  });
  await items.map((i) => {
    const metadata = Object?.values(i?.meta_data).map((key) => {
      return key;
    });
    periodico = metadata?.filter((m) => m.key === "_subscription_period")[0]
      ?.value;
    intervalo = metadata?.filter(
      (m) => m.key === "_subscription_period_interval"
    )[0]?.value;

    if (i.type === "subscription") {
      lineItemsWC.push({
        ID: i.id,
        product_id: i.id,
        metadata: { order_id: wc.id },
        price_data: {
          currency: "EUR",
          recurring: {
            interval: periodico,
            interval_count: intervalo,
          },
          unit_amount_decimal:
            i.sale_price !== "" ? i.sale_price * 100 : i.regular_price * 100,
          product_data: {
            name: i.nombrePadre,
            images: i?.images ? [i?.images[0]?.src] : [i?.image?.src],
          },
        },
        quantity: 1,
      });
    }
  });

  let cup = {};
  if (cupon) {
    if (cupon?.discount_type === "percent") {
      await stripe.coupons
        .create({
          percent_off: cupon?.amount,
          duration: "once",
        })
        .then((res) => (cup = res));
    } else if (cupon?.discount_type === "amount") {
      await stripe.coupons
        .create({ amount_off: cupon?.amount, duration: "once" })
        .then((res) => (cup = res));
    }
  }

  if (req.method === "POST") {
    const wcForm = {
      first_name: formulario.billing.first_name,
      email: formulario.billing.email,
      username: formulario.billing.email,
      last_name: formulario.billing.last_name,
      billing: {
        first_name: formulario.billing.first_name,
        last_name: formulario.billing.last_name,
        address_1: formulario.billing.address_1,
        address_2: formulario.billing.address_2,
        city: formulario.billing.city,
        state: formulario.billing.state,
        postcode: formulario.billing.postcode,
        country: formulario.billing.country,
        email: formulario.billing.email,
        phone: formulario.billing.phone,
      },
      shipping: {
        first_name: formulario.shipping.first_name,
        last_name: formulario.shipping.last_name,
        address_1: formulario.shipping.address_1,
        address_2: formulario.shipping.address_2,
        city: formulario.shipping.city,
        state: formulario.shipping.state,
        postcode: formulario.shipping.postcode,
        country: formulario.shipping.country,
        email: formulario.shipping.email,
        phone: formulario.shipping.phone,
      },
    };

    const cs = await WooCommerce.get(
      "customers?email=" + formulario.billing.email
    )
      .then((response) => {
        WooCommerce.put("customers/" + response.data[0].id, wcForm)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        WooCommerce.post("customers", wcForm)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    let formulario2 = {
      ...formulario,
      coupon_lines: [
        {
          code: cupon.code,
        },
      ],
    };
    console.log(formulario);

    // Create Checkout Sessions from body params.
    const wc = await WooCommerce.post("orders", formulario2)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    const wcCustomer = WooCommerce.post("customers", wcForm)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    const customer = await stripe.customers.create({
      email: formulario.billing.email,
      name: formulario.billing.first_name,
      shipping: {
        address: {
          city: formulario.shipping.city,
          country: formulario.shipping.country,
          line1: formulario.shipping.address_1,
          postal_code: formulario.shipping.postcode,
          state: formulario.shipping.state,
        },
        name: formulario.shipping.first_name,
      },
      address: {
        city: formulario.billing.city,
        country: formulario.billing.country,
        line1: formulario.billing.address_1,
        postal_code: formulario.billing.postcode,
        state: formulario.billing.state,
      },
    });
    function addDaysToDate(date, days) {
      var res = new Date(date);
      res.setDate(res.getDate() + days);
      return res;
    }

    var data = {
      customer_id: wcCustomer.id,
      parent_id: wc.id,
      status: "on-hold",
      billing_period: periodico,
      billing_interval: intervalo,
      start_date: dateFormat(new Date(), "yyyy-mm-d H:mm:s"),
      next_payment_date: dateFormat(
        addDaysToDate(new Date(), 30),
        "yyyy-mm-d H:mm:s"
      ),
      payment_method: "stripe",
      payment_details: {
        post_meta: {
          _stripe_customer_id: customer?.id,
        },
      },
      billing: wcForm?.billing,
      shipping: wcForm?.shipping,
      line_items: lineItemsWC,
      shipping_lines: wcForm?.shipping_lines,
    };
    let suscripcion = undefined;
    if (sus) {
      suscripcion = await WooCommerce.post("subscriptions", data).then(
        (res) => res.data
      );
    }

    const session = await stripe.checkout.sessions
      .create({
        line_items: lineItems,
        mode: sus ? "subscription" : "payment",
        success_url: sus
          ? `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&wc_order_id=${wc.id}&suscripcion=${suscripcion.id}`
          : `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&wc_order_id=${wc.id}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        discounts: [
          {
            coupon: cup?.id,
          },
        ],
        customer: customer?.id,
        metadata: {
          order_id: wc?.id,
          sus_id: suscripcion?.id,
        },
      })
      .then((session) => {
        return session;
      });
    res.status(200).json(session);
  }
}
