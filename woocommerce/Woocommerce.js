import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: "https://apiplantilla.mwlb.es",
  consumerKey: "ck_2d7c6d79c2af2edddc60706d02db7bc4d0d219b8",
  consumerSecret: "cs_6a55fc48ffd5e20c18bcb160c2fb9a808108987c",
  version: "wc/v3",

  queryStringAuth: false,
});

export default WooCommerce;
