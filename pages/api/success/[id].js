import WooCommerce from "../../../woocommerce/Woocommerce";

export default async (req, res) => {
  const estado = {
    status: "processing",
  };

  const wc_order_id = req.query.id.toString();
  const sus = req.body.susID;
  const session = req.body.sesion;
  const pedido = await WooCommerce.put("orders/" + wc_order_id, estado)
    .then((response) => {
      return response;
    })
    .catch((error) => {});
  const estadoSUS = {
    status: "active",

    post_meta: {
      _stripe_session_id: session,
    },
  };
  await WooCommerce.put("subscriptions/" + sus, estadoSUS);

  return res.status(200);
};
