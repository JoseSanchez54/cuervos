import SobreNosotros from "../components/SobreNosotros";
import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
const Nosotros = ({ opciones, pagina, categorias }) => {
  return (
    <>
      <SobreNosotros
        opciones={opciones}
        pagina={pagina}
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
    (page) => page.pagina_asociada === "nosotros"
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
