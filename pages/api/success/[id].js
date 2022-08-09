import WooCommerce from "../../../woocommerce/Woocommerce";

export default async (req, res) => {
  const estado = {
    status: "processing",
  };
  const estadoSUS = {
    status: "active",
  };

  const wc_order_id = req.query.id.toString();
  const sus = req.body.susID;
  const pedido = await WooCommerce.put("orders/" + wc_order_id, estado)
    .then((response) => {
      return response;
    })
    .catch((error) => {});
  await WooCommerce.put("subscriptions/" + sus, estadoSUS);

  return res.status(200);
};
