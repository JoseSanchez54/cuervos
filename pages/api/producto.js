import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req?.id) {
    return WooCommerce.get("products" + req?.id).then((response) => {
      return res.status(200).json(response.data);
    });
  }
};
