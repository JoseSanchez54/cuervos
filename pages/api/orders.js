import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req.method === "GET") {
    await WooCommerce.get("orders")
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        return res.status(500).json({ Error: "Error en la api" });
      });
  } else if (req.method === "POST") {
    let { formulario } = req.body;
    formulario.payment_method = "paypal";
    formulario.payment_method_title = "PayPal";

    await WooCommerce.post("orders", formulario)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        return res.status(500).json({ Error: "Error en la api" });
      });
  }
};
