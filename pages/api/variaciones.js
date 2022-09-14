import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req.query.id) {
    const variaciones = await WooCommerce.get(
      "products/" + req.query.id + "/variations" + "?per_page=50"
    ).then((response) => {
      return response.data;
    });
    await res.status(200).json(variaciones);
  } else {
    return;
  }
};
