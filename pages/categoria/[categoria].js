import axios from "axios";
import WooCommerce from "../../woocommerce/Woocommerce";
import { useOptions } from "../../hooks/useOptions";
import { useProducts } from "../../hooks/useProducts";
import Categorias from "../../components/Categorias";
import { usePages } from "../../hooks/usePages";

export const getStaticPaths = async () => {
  const categorias = await WooCommerce.get(
    "products/categories?per_page=100"
  ).then((response) => {
    return response.data;
  });

  const paths = await categorias.map((produ) => {
    return {
      params: {
        categoria: produ.slug.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};
export async function getStaticProps(props) {
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
    (page) => page.pagina_asociada === "tienda"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  const categoriaActual = await categorias.find(
    (e) => e.slug === props.params.categoria
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const productos = await WooCommerce.get(
    "products?per_page=100&status=publish&category=" + categoriaActual?.id
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      template: template,
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
  const { isLoading, options: optionsSWR } = useOptions(options);
  const { data } = usePages(pagesNew, "tienda");
  const { products: productosSWR } = useProducts(productos, categoriaActual);

  return (
    <>
      <Categorias
        pagina={data}
        categorias={categorias}
        opciones={optionsSWR}
        productos={productosSWR}
        actual={categoriaActual}
      />
    </>
  );
}
