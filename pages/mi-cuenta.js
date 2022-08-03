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
  const username = useSelector((state) => state.userReducer.email);
  const userOrders = orders?.filter(
    (order) => order?.billing?.email === username
  );
  console.log(userOrders);

  return (
    <>
      <DefaultSeo
        title="Mi cuenta"
        description="Página de mi cuenta"
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
      <div className="flex flex-row mt-9 w-full  justify-center ">
        <div className="flex flex-col w-full max-w-[1600px]  items-center">
          <span className="titulo my-6">Pedidos</span>
          <div className="grid w-full lg:grid-cols-6 grid-cols-4 gap-4 ">
            <div className="lg:block hidden text-center">
              <span className="encabezado">ID</span>
            </div>
            <div className="text-center">
              <span className="encabezado">Total</span>
            </div>
            <div className="text-center">
              <span className="encabezado">Estado</span>
            </div>
            <div className="text-center">
              <span className="encabezado">Calle</span>
            </div>
            <div className="text-center">
              <span className="encabezado">Ciudad</span>
            </div>
            <div className="text-center lg:block hidden">
              <span className="encabezado">CP</span>
            </div>
          </div>

          {userOrders?.map((order, index) => {
            return (
              <div
                key={index}
                className={
                  index % 2 === 0
                    ? "grid w-full lg:grid-cols-6 grid-cols-4 gap-4 py-5"
                    : "grid w-full lg:grid-cols-6 grid-cols-4 gap-4 py-5 bg-[#f7f7f7]"
                }
              >
                <div className=" lg:block hidden text-center">
                  <span className="dato">{order?.id}</span>
                </div>
                <div className="text-center">
                  <span className="dato">{order?.total}€</span>
                </div>
                <div className="text-center">
                  <span
                    className={
                      (order?.status === "processing" && "dato processing") ||
                      (order?.status === "completed" && "dato completed") ||
                      (order?.status === "cancelled" && "dato cancelled") ||
                      (order?.status === "pending" && "dato pending")
                    }
                  >
                    {order?.status}
                  </span>
                </div>
                <div className="text-center">
                  <span className="dato">{order?.billing?.address_1}</span>
                </div>
                <div className="text-center">
                  <span className="dato">{order?.billing?.city}</span>
                </div>
                <div className="text-center lg:block hidden">
                  <span className="dato">{order?.billing?.postcode}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .encabezado {
          font-family: ${optionsSWR?.fuente_global};
          font-weight: bold;
          font-size: 1.2rem;
        }
        .dato {
          font-family: ${optionsSWR?.fuente_global};
          font-weight: normal;
          font-size: 15px;
          text-transform: capitalize;
        }
        .titulo {
          font-family: ${optionsSWR?.fuente_global};
          font-weight: bold;
          font-size: 31px;
        }
        .processing,
        .completed {
          color: #5b841b;
          background-color: #c6e1c6;
          padding: 0.3rem 0.6rem;
          border-radius: 0.25rem;
        }
        .cancelled,
        .pending {
          color: #777;
          background: #e5e5e5;
          padding: 0.3rem 0.6rem;
          border-radius: 0.25rem;
        }
        @media (max-width: 1022px) {
        }
      `}</style>
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
