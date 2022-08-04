import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  await WooCommerce.get("taxes")
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {});
};
