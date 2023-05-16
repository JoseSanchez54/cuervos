import axios from "axios";

import WooCommerce from "../woocommerce/Woocommerce";
import HomeCuervos from "../components/Home";
import { useOptions } from "../hooks/useOptions";

export default function Tienda({ options, categorias, pagesNew, vinos }) {
  const { isLoading, options: optionsSWR } = useOptions(options);
  return (
    <>
      <HomeCuervos
        pagina={pagesNew}
        categorias={categorias}
        opciones={optionsSWR}
        vinos={vinos}
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
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  const vinos = await WooCommerce.get("products?category=89").then(
    (response) => {
      return response.data;
    }
  );

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      template: template,
      internos: internos,
      categorias,
      vinos,
    },
    revalidate: 10,
  };
}
