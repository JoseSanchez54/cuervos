import axios from "axios";

import WooCommerce from "../woocommerce/Woocommerce";
import HomeCuervos from "../components/Home";

export default function Home({ options, categorias, pagesNew, productos }) {
  return (
    <>
      <HomeCuervos
        pagina={pagesNew}
        categorias={categorias}
        opciones={options}
        productos={productos}
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
  const categorias = await WooCommerce.get("products/categories").then(
    (response) => {
      return response.data;
    }
  );
  const productos = await WooCommerce.get("products").then((response) => {
    return response.data;
  });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      template: template,
      entradas: posts,
      internos: internos,
      categorias,
      productos,
    },
    revalidate: 10,
  };
}
