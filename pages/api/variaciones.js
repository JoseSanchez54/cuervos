import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {
  if (req?.query?.id) {
    await WooCommerce.get(
      "products/" + req.query.id + "/variations" + "?per_page=50"
    ).then((response) => {
      return res.status(200).json(response.data);
    });
  }
};
