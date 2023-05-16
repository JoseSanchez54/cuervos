import WooCommerce from "../woocommerce/Woocommerce";
const fetcherWc = (...url) =>
  WooCommerce.get(...url).then((response) => response.data);
export default fetcherWc;
