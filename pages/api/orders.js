import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  return await WooCommerce.get("orders")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
