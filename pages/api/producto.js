import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  const x = await WooCommerce.get("products/" + req?.id).then((response) => {
    return response.data;
  });
  await res.status(200).json(x);
};
