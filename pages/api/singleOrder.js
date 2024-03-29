import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req.method === "GET") {
    let { id } = req.body;
    await WooCommerce.get("orders")
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        return res.status(500).json({ Error: "Error en la api" });
      });
  }
};
