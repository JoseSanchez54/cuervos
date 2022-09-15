import dynamic from "next/dynamic";
import axios from "axios";
import WooCommerce from "../../woocommerce/Woocommerce";
const Nav = dynamic(() => import("../../components/Nav"));

const Embajadores = ({ options, pagesNew, categorias, embajadores }) => {
  return <Nav categorias={categorias} opciones={options} />;
};
export default Embajadores;
export async function getStaticProps(props) {
  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "embajadores"
  );
  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const embajadores = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/embajadores")
    .then((res) => res.data);
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      categorias,
      embajadores,
    },
    revalidate: 10,
  };
}
