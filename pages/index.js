import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import HomePrintly from "../components/Home";
import { useOptions } from "../hooks/useOptions";
import { useProducts } from "../hooks/useProducts";
import { usePages } from "../hooks/usePages";

export default function Home({
  options,
  categorias,
  pagesNew,
  ofertasMes,
  sectores,
}) {
  const { options: optionsSWR } = useOptions(options);
  const { data } = usePages(pagesNew, "Principal");
  const { products: productosSWR } = useProducts(ofertasMes, 1457);
  console.log(sectores);

  return (
    <>
      <HomePrintly
        pagina={data}
        categorias={categorias}
        opciones={optionsSWR}
        ofertas={productosSWR}
      />
    </>
  );
}

export async function getStaticProps() {
  const sectores = await axios
    .get(process.env.URLBASE + "wp-json/wp/v2/sectores")
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
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  const ofertasMes = await WooCommerce.get(
    "products?category=1457&status=publish"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      entradas: posts,
      ofertasMes,
      categorias,
      sectores,
    },
    revalidate: 10,
  };
}
