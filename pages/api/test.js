import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  return WooCommerce.get(
    "products?per_page=50products?category=" + req?.categoria?.id
  )
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
