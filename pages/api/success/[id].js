import WooCommerce from "../../../woocommerce/Woocommerce";

export default async (req, res) => {
  const estado = {
    status: "completed",
  };
  const wc_order_id = req.query.id.toString();
  const pedido = await WooCommerce.put("orders/" + wc_order_id, estado)
    .then((response) => {
      return response;
    })
    .catch((error) => {
   
    });

  return res.status(200).json(pedido);
};
