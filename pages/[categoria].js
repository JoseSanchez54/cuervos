import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import { useProducts } from "../hooks/useProducts";
import Categorias from "../components/Categorias";
export const getStaticPaths = async () => {
  const categorias = await WooCommerce.get("products/categories").then(
    (response) => {
      return response.data;
    }
  );

  const paths = categorias.map((produ) => {
    return {
      params: {
        categoria: produ.slug.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};
export async function getStaticProps(props) {
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
    (page) => page.pagina_asociada === "tienda"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc"
  ).then((response) => {
    return response.data;
  });
  const categoriaActual = categorias.find(
    (e) => e.slug === props.params.categoria
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const productos = await WooCommerce.get(
    "products?category=" + categoriaActual.id
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      template: template,
      entradas: posts,
      internos: internos,
      productos,
      categorias,
    },
    revalidate: 10,
  };
}

export default function Tienda({ options, categorias, pagesNew, productos }) {
  const { isLoading, options: optionsSWR } = useOptions(options);
  const { products: productosSWR } = useProducts(productos);
  console.log("a", productosSWR);
  console.log("productos", productos);

  return (
    <>
      <Categorias
        pagina={pagesNew}
        categorias={categorias}
        opciones={optionsSWR}
        productos={productosSWR}
      />
    </>
  );
}
