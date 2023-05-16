import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.URLBASE,
  consumerKey: process.env.WCKEY,
  consumerSecret: process.env.WCS,
  version: "wc/v3",

  queryStringAuth: false,
});

export default WooCommerce;
