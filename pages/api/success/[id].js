import WooCommerce from "../../../woocommerce/Woocommerce";

/* A function that is called when a user makes a payment. */
export default async (req, res) => {
  const estado = {
    status: "processing",
  };

  const sus = req.query.sus;
  const session = req.query.sesion;
  const wc_order_id = req.query.id;
  const pedido = await WooCommerce.put("orders/" + wc_order_id, estado)
    .then((response) => {
      return response;
    })
    .catch((error) => {});
  const estadoSUS = {
    status: "active",
    meta_data: [
      {
        id: 50649,
        key: "_stripe_source_id",
        value: "src_XE3xLw39fq4Ck7c2h8RgaQ25",
      },
      {
        _stripe_session_id: session,
      },
      {
        key: "_stripe_session_id",
        value: session,
      },
    ],

    post_meta: {
      _stripe_session_id: session,
    },
  };
  if (sus && sus !== "undefined") {
    await WooCommerce.put("subscriptions/" + sus, estadoSUS);
  }

  return res.status(200).json({ estado: "ok" });
};
