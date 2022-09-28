import SobreNosotros from "../components/SobreNosotros";
import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import { usePages } from "../hooks/usePages";

const Nosotros = ({ opciones, pagina, categorias }) => {
  const { isLoading, options: optionsSWR } = useOptions(opciones);

  return (
    <>
      <SobreNosotros opciones={optionsSWR} categorias={categorias} />
    </>
  );
};
export default Nosotros;

export async function getStaticProps() {
  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      opciones: options.data[0],
      categorias,
    },
    revalidate: 10,
  };
}
