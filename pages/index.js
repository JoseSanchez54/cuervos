import axios from "axios";

import WooCommerce from "../woocommerce/Woocommerce";
import HomeCuervos from "../components/Home";
import { useOptions } from "../hooks/useOptions";
import { useProducts } from "../hooks/useProducts";
import { usePages } from "../hooks/usePages";

export default function Home({
  options,
  categorias,
  pagesNew,
  vinos,
  pedidos,
}) {
  const { isLoading, options: optionsSWR } = useOptions(options);
  const { data, isValidating } = usePages(pagesNew, "Principal");
  const { products: productosSWR } = useProducts(vinos);
  console.log(pedidos);

  return (
    <>
      <HomeCuervos
        pagina={data}
        categorias={categorias}
        opciones={optionsSWR}
        vinos={productosSWR}
      />
    </>
  );
}

export async function getStaticProps() {
  const template = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data[0].plantilla);
  const internos = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data);
  const posts = await axios
    .get(process.env.URLBASE + "wp-json/wp/v2/allposts")
    .then((res) => res?.data);

  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "Principal"
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc"
  ).then((response) => {
    return response.data;
  });
  const vinos = await WooCommerce.get("products?category=1430").then(
    (response) => {
      return response.data;
    }
  );
  const pedidos = await WooCommerce.get("orders")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      template: template,
      entradas: posts,
      internos: internos,
      categorias,
      vinos,
      pedidos,
    },
    revalidate: 10,
  };
}
