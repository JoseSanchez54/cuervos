import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import { useOrders } from "../hooks/useOrders";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { DefaultSeo } from "next-seo";

export default function MiCuenta({ options, pedidos, categorias, usuarios }) {
  const { isLoading, options: optionsSWR } = useOptions(options);
  const { orders, isValidating } = useOrders(pedidos);
  const username = useSelector((state) => state.userReducer.username);
  const userOrders = orders?.filter(
    (order) => order?.billing?.email === username
  );
  console.log(userOrders);

  return (
    <>
      <DefaultSeo
        title="Mi cuenta"
        description="PAgina de mi cuenta"
        canonical={process.env.URLFINAL + "/mi-cuenta"}
        additionalLinkTags={[
          {
            rel: "icon",
            href: options.favicon_principal,
          },
        ]}
        openGraph={{
          type: "website",
          locale: "en_ES",
          url: process.env.URLFINAL + "/mi-cuenta",
          site_name: options.nombre_sitio,
          description: options.descripcion_sitio,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Nav categorias={categorias} opciones={optionsSWR} />
    </>
  );
}

export async function getStaticProps() {
  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const pedidos = await WooCommerce.get("orders")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  const categorias = await WooCommerce.get(
    "products/categories?order=desc"
  ).then((response) => {
    return response.data;
  });
  const usuarios = await axios
    .get(process.env.URLBASE + "wp-json/wp/v2/users")
    .then((res) => res.data);

  return {
    props: {
      options: options.data[0],
      pedidos,
      categorias,
      usuarios,
    },
    revalidate: 10,
  };
}
