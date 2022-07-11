import axios from "axios";

import WooCommerce from "../woocommerce/Woocommerce";
import HomeCuervos from "../components/Home";
import { useOptions } from "../hooks/useOptions";
import { useProducts } from "../hooks/useProducts";
import { usePages } from "../hooks/usePages";

export default function Home({ options, categorias, pagesNew, vinos }) {
  /*   const { isLoading, options: optionsSWR } = useOptions(options);
  const { data, isValidating } = usePages(pagesNew, "Principal");
  const { products: productosSWR } = useProducts(vinos); */

  return (
    <>
      <h1>TEst</h1>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 10,
  };
}
