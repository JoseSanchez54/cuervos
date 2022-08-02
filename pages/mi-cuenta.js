import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import { useOrders } from "../hooks/useOrders";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";

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
