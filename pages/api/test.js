import WooCommerce from "../../woocommerce/Woocommerce";

export default async (req, res) => {

    const pro = await WooCommerce.get(
      "products?per_page=50products&status=publish&category=" +
        req?.categoria?.id
    ).then((response) => {
      return response.data;
    });
    await res.status(200).json(pro);
  
};
