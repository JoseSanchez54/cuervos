import NuestraVision from "../components/NuestraVision";
import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import { usePages } from "../hooks/usePages";
import { useProducts } from "../hooks/useProducts";
const Nosotros = ({ opciones, pagina, categorias }) => {
  const { isLoading, options: optionsSWR } = useOptions(opciones);
  const { data, isValidating } = usePages(pagina, "vision");

  return (
    <>
      <NuestraVision
        opciones={optionsSWR}
        pagina={data}
        categorias={categorias}
      />
    </>
  );
};
export default Nosotros;

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
    (page) => page.pagina_asociada === "vision"
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      opciones: options.data[0],
      pagina: home2,
      template: template,
      entradas: posts,
      internos: internos,
      categorias,
    },
    revalidate: 10,
  };
}
