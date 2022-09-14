import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  const taxes = await WooCommerce.get("taxes")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
  await res.status(200).json(taxes);
};
