import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req?.categoria?.id) {
    return WooCommerce.get(
      "products?per_page=50products?category=" + req?.categoria?.id
    ).then((response) => {
      return res.status(200).json(response.data);
    });
  }
};
