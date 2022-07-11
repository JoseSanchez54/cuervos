import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import { useProducts } from "../hooks/useProducts";
import Categorias from "../components/Categorias";
import { usePages } from "../hooks/usePages";
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
  return {
    props: {
      options: options.data,
      pagesNew: home2,
      template: template,
      entradas: posts,
      internos: internos,
      productos,
      categorias,
      categoriaActual,
    },
    revalidate: 10,
  };
}

export default function Tienda({
  options,
  categorias,
  pagesNew,
  productos,
  categoriaActual,
}) {
  return <></>;
}
