import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useOptions } from "../hooks/useOptions";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { DefaultSeo } from "next-seo";
import Image from "next/image";
import fetcherWc from "../utils/fetcherWc";
import useSWR from "swr";
import Footer from "../components/Footer";
import SyncLoader from "react-spinners/SyncLoader";
import { usePages } from "../hooks/usePages";
import { useDispatch } from "react-redux";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { Dropdown } from "@nextui-org/react";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function MiCuenta({
  options,
  pedidos,
  categorias,
  pagina,
  suscriptions,
  sessions,
}) {
  console.log(sessions);
  const username = useSelector((state) => state.userReducer.email);
  const { data } = usePages(pagina, "area");
  const dispatch = useDispatch();
  const handleConnect = async () => {
    await dispatch({ type: "@Remove" });
    window.location.href = "/";
  };
  const { isLoading, options: optionsSWR } = useOptions(options);
  const pedidos1 = useSWR("orders", fetcherWc);
  const customers = useSWR("customers", fetcherWc);
  const { data: sus } = useSWR("subscriptions", fetcherWc);

  const userSus = sus?.filter((rel) => rel?.billing?.email === username);
  console.log(userSus);
  const userOrders = pedidos1?.data?.filter(
    (order) => order?.billing?.email === username
  );
  const userCustomer = customers?.data?.find(
    (order) => order?.billing?.email === username
  );
  const usuario = {
    nombre: userCustomer?.billing?.first_name,
    apellido: userCustomer?.billing?.last_name,
    nombreCompleto:
      userCustomer?.billing?.first_name +
      " " +
      userCustomer?.billing?.last_name,
    email: userCustomer?.billing?.email,
    telefono: userCustomer?.billing?.phone,
    direccion: userCustomer?.billing?.address_1,
    ciudad: userCustomer?.billing?.city,
    pais: userCustomer?.billing?.country,
    codigoPostal: userCustomer?.billing?.postcode,
  };

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
      <div
        style={{ color: "white" }}
        className="flex  flex-row w-full  alto items-end justify-center"
      >
        <div className="flex flex-col justify-center w-full h-full">
          <div className="relative w-full justify-center flex h-full">
            <div className="flex p-5 flex-col justify-center max-w-[1600px] items-start w-full h-full">
              <span className="z-[10]  uppercase text-start tituloPrimera ">
                Bienvenido,
                <br />{" "}
                {usuario?.nombreCompleto ? usuario?.nombreCompleto : username}
              </span>
              <Image
                objectFit="cover"
                src={data?.fondo_contacto}
                layout="fill"
                priority="high"
                quality={100}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col items-center max-w-[1900px]">
          <div className="flex flex-row px-5 justify-start lg:justify-end w-full my-5">
            <button onClick={() => handleConnect()} className="logout">
              Desconectarse
            </button>
          </div>
          <div className="flex flex-row w-full lg:flex-nowrap flex-wrap gap-9 justify-center">
            <div className="flex flex-col w-full lg:w-1/2 items-center">
              <div className="flex flex-row my-9 w-full lg:min-h-[76vh]  justify-center ">
                <div className="flex flex-col w-full max-w-[1600px]  items-center">
                  <span className="titulo my-9 uppercase">Pedidos</span>
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
                  {pedidos1.isValidating ? (
                    <div className="my-9 h-full pt-9 justify-center flex w-full">
                      <SyncLoader />
                    </div>
                  ) : (
                    <>
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
                                  (order?.status === "processing" &&
                                    "dato processing") ||
                                  (order?.status === "completed" &&
                                    "dato completed") ||
                                  (order?.status === "cancelled" &&
                                    "dato cancelled") ||
                                  (order?.status === "pending" &&
                                    "dato pending")
                                }
                              >
                                {order?.status}
                              </span>
                            </div>
                            <div className="text-center">
                              <span className="dato">
                                {order?.billing?.address_1}
                              </span>
                            </div>
                            <div className="text-center">
                              <span className="dato">
                                {order?.billing?.city}
                              </span>
                            </div>
                            <div className="text-center lg:block hidden">
                              <span className="dato">
                                {order?.billing?.postcode}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 items-center">
              <div className="flex flex-row my-9 w-full lg:min-h-[76vh]  justify-center ">
                <div className="flex flex-col w-full max-w-[1600px]  items-center">
                  <span className="titulo my-9 uppercase">Suscripciones</span>
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
                      <span className="encabezado">Siguiente pago</span>
                    </div>
                    <div className="text-center">
                      <span className="encabezado">Último pago</span>
                    </div>
                    <div className="text-center lg:block hidden"></div>
                  </div>
                  {pedidos1.isValidating ? (
                    <div className="my-9 h-full pt-9 justify-center flex w-full">
                      <SyncLoader />
                    </div>
                  ) : (
                    <>
                      {userSus?.map((order, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              index % 2 === 0
                                ? "grid w-full lg:grid-cols-6 grid-cols-4 gap-4 py-5"
                                : "grid w-full lg:grid-cols-6 grid-cols-4 gap-4 py-5 bg-[#f7f7f7]"
                            }
                          >
                            <div className=" hidden text-center lg:flex items-center justify-center">
                              <span className="dato">{order?.id}</span>
                            </div>
                            <div className="text-center flex items-center justify-center">
                              <span className="dato">{order?.total}€</span>
                            </div>
                            <div className="text-center flex items-center justify-center">
                              <span
                                className={
                                  (order?.status === "processing" &&
                                    "dato processing") ||
                                  (order?.status === "active" &&
                                    "dato completed") ||
                                  (order?.status === "cancelled" &&
                                    "dato cancelled") ||
                                  (order?.status === "on-hold" &&
                                    "dato pending")
                                }
                              >
                                {order?.status}
                              </span>
                            </div>
                            <div className="text-center lg:flex items-center justify-center">
                              <span className="dato">
                                {new Date(
                                  order?.next_payment_date_gmt
                                )?.toLocaleDateString("es-ES", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="text-center flex items-center justify-center">
                              <span className="dato">
                                {" "}
                                {new Date(
                                  order?.last_payment_date_gmt
                                )?.toLocaleDateString("es-ES", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="text-center  lg:flex items-center justify-center">
                              <Dropdown>
                                <Dropdown.Button
                                  css={{
                                    backgroundColor: "black",
                                    color: "white",
                                  }}
                                  flat
                                >
                                  <HiOutlineDotsVertical size="20px" />
                                </Dropdown.Button>
                                <Dropdown.Menu
                                  css={{
                                    fontFamily: optionsSWR?.fuente_global,
                                  }}
                                  aria-label="Static Actions"
                                >
                                  <Dropdown.Item color="error" key="cancelar">
                                    Cancelar suscripción
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer options={optionsSWR} />
      <style jsx>{`
        .logout {
          cursor: pointer;
          background: black;
          color: white;
          font-family: ${optionsSWR?.fuente_global};
          padding: 20px 30px;
          text-transform: uppercase;
          border: 1px solid black;
        }
        .logout:hover {
          background: white;
          color: black;
          border: 1px solid black;
        }
        .encabezado {
          font-family: ${optionsSWR?.fuente_global};
          font-weight: bold;
          font-size: 1.2rem;
        }
        .tituloPrimera {
          font-family: ${optionsSWR?.fuente_global};
          font-size: 45px;
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
        .alto {
          height: 500px;
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
          .alto {
            height: 200px;
          }
          .tituloPrimera {
            font-family: ${optionsSWR?.fuente_global};
            font-size: 25px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const sessions = await stripe.subscriptions.list({
    limit: 20,
  });

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
  const suscriptions = await WooCommerce.get("subscriptions").then(
    (res) => res.data
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });

  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const pagina = await pagesNew.data.find(
    (page) => page.pagina_asociada === "area"
  );
  const customers = await WooCommerce.get("customers")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return {
    props: {
      options: options.data[0],
      pedidos,
      categorias,
      pagina,
      customers,
      suscriptions,
      sessions,
    },
    revalidate: 10,
  };
}
