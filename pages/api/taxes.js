import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  return WooCommerce.get("taxes")
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log("err", error);
    });
};
