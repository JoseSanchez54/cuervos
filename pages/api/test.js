import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req?.categoria?.id) {
    await WooCommerce.get(
      "products?per_page=50products&status=publish&category=" +
        req?.categoria?.id
    ).then((response) => {
      return res.status(200).json(response.data);
    });
  } else {
    res.status(404).json({ Error: "Error en la api" });
  }
};
