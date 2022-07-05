import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
//import "instantsearch.css/themes/satellite.css";
import Image from "next/image";
import { useOptions } from "../../hooks/useOptions";
import { ImCross } from "react-icons/im";
import { useState, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMobile from "../../hooks/useMobile";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { Collapse, Text } from "@nextui-org/react";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";

const searchClient = algoliasearch(
  "W7S8KNN3GE",
  "26794b92eff643ed00a578f375cec1f5"
);
//Aqui creamos el contexto
const SelectedContext = createContext();

const Hit = ({ hit }) => {
  const { options } = useOptions();
  //CReamos el contexto fuera del componente para que no se vuelva a renderizar, despues destructuramos el contexto para obtener el valor y el setter (abajo mas info)
  const { selecciona, setSeleccionado } = useContext(SelectedContext);
  const handleClick = () => {
    setSeleccionado({
      image: hit.product_image,
      title: hit.product_name,
      price: hit.regular_price,
      salePrice: hit.sale_price,
      onSale: hit.on_sale,
      shortDescription: hit.short_description,
      category: hit.category,
      id: hit.objectID,
      description: hit.description,
      type: hit.type,
      stock: hit.stock,
      upsells: hit.upsells,
      crossSells: hit.crossSells,
      slug: hit.slug,
    });
  };

  return (
    <>
      <div
        onClick={() => handleClick()}
        className="flex flex-row items-center w-full gap-5 "
      >
        <Image
          objectFit="contain"
          height="50px"
          width="50px"
          src={hit.product_image}
        ></Image>
        <div className="flex flex-col">
          <div className="flex flex-row">
            {hit.category.map((e, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: options[0]?.color_principal,
                  color: options[0]?.color_secundario,
                  padding: "2px 7px",
                  marginRight: "5px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontFamily: options[0]?.fuente_global,
                }}
                className="mb-2 categoriaSingle"
              >
                {e}
              </span>
            ))}
          </div>
          <Highlight hit={hit} attribute="product_name" />
          <span className="regular_price">{hit.regular_price}€</span>
        </div>
      </div>
    </>
  );
};
const SearchPanel = ({ cerrar }) => {
  const contextoSeleccionado = useContext(SelectedContext);
  const { selecciona, setSeleccionado } = contextoSeleccionado;
  const [busqueda, setBusqueda] = useState("");
  const { isMobile } = useMobile();
  const { options } = useOptions();
  const handleClickVolver = () => {
    setSeleccionado(null);
  };

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="indice">
        <motion.div
          initial={{
            opacity: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          className="fixed z-[997] flex flex-row items-start justify-center w-screen h-screen  lg:items-center bg-[#ffffffad]"
        >
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{ scale: 0 }}
            className="flex flex-row w-full max-w-[1040px] rounded-lg z-[999] sombreado  bg-white"
          >
            <div className="flex flex-col w-full">
              <div className="flex flex-row min-h-[81px] h-[5vh] w-full">
                <div className="flex flex-col inherit">
                  <SearchBox
                    translations={{
                      placeholder: "Buscar...",
                    }}
                    onChange={(e) => {
                      setBusqueda(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col items-end justify-center w-[50px]">
                  <button onClick={(e) => cerrar(false)}>
                    <ImCross color="#000" />
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {busqueda !== "" && (
                  <motion.div
                    initial={{ maxHeight: "111px" }}
                    animate={{ maxHeight: "600px" }}
                    exit={{ maxHeight: "111px" }}
                    className="flex flex-row flex-wrap w-full buscador max-h-[84vh] lg:max-h-[600px] overflow-x-hidden overflow-auto"
                  >
                    {!isMobile ? (
                      <div className="flex flex-col w-full h-full overflow-y-auto lg:w-1/2">
                        <Hits hitComponent={Hit} />
                      </div>
                    ) : (
                      <>
                        {!selecciona ? (
                          <div className="flex flex-col w-full h-full overflow-y-auto lg:w-1/2">
                            <Hits hitComponent={Hit} />
                          </div>
                        ) : (
                          //Aqui version movil
                          <motion.div
                            transition={{
                              x: { type: "spring", stiffness: 100 },
                              default: { duration: 0.5 },
                            }}
                            exit={{ x: "100px" }}
                            initial={{
                              x: "100px",

                              overflow: "hidden",
                            }}
                            animate={{
                              x: 0,

                              overflow: "hidden",
                            }}
                            className="flex flex-col items-center w-full lg:w-1/2"
                          >
                            <div className="relative flex flex-row justify-center w-full">
                              <div
                                onClick={() => handleClickVolver()}
                                className="volver"
                              >
                                <AiOutlineArrowLeft />
                              </div>
                              {selecciona.category.map((e, index) => (
                                <span
                                  style={{
                                    backgroundColor:
                                      options[0]?.color_principal,
                                    color: options[0]?.color_secundario,
                                    padding: "2px 7px",
                                    marginRight: "5px",
                                    borderRadius: "20px",
                                    fontSize: "11px",
                                    fontFamily: options[0]?.fuente_global,
                                  }}
                                  className="categoria"
                                  key={index}
                                >
                                  {e}
                                </span>
                              ))}
                            </div>
                            <Link
                              passHref
                              href={"/productos/" + selecciona.slug}
                            >
                              <a>
                                <h1
                                  style={{
                                    color: "black",
                                    fontSize: "18px",
                                    fontFamily: options[0]?.fuente_global,
                                    textAlign: "center",
                                    marginTop: "7px",
                                    marginBottom: "7px",
                                  }}
                                >
                                  {selecciona.title}
                                </h1>
                              </a>
                            </Link>
                            <Image
                              src={selecciona.image}
                              width="300px"
                              height="300px"
                              objectFit="contain"
                              className="rounded"
                            />
                            <div className="flex flex-row items-center justify-center w-full mt-5">
                              <Collapse title="Información">
                                <Text>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: selecciona.description,
                                    }}
                                  ></div>
                                </Text>{" "}
                              </Collapse>
                            </div>
                            <div className="flex flex-row items-center justify-center w-full">
                              <div className="flex flex-col items-start justify-center w-1/3">
                                <span
                                  style={{
                                    fontFamily: options[0]?.fuente_global,
                                    fontSize: "23px",
                                  }}
                                  className="precio"
                                >
                                  {selecciona.price}€
                                </span>
                              </div>
                              <div className="flex flex-col items-end justify-center w-2/3">
                                <motion.button
                                  whileHover={{
                                    backgroundColor: "transparent",
                                    color: options[0]?.color_principal,
                                    border:
                                      "1px solid " +
                                      options[0]?.color_principal,
                                  }}
                                  initial={{
                                    backgroundColor:
                                      options[0]?.color_principal,
                                    color: options[0]?.color_secundario,
                                    padding: "10px 20px",
                                    borderRadius: "20px",
                                    fontFamily: options[0]?.fuente_global,
                                    fontSize: "14px",
                                  }}
                                >
                                    <a
                                          className="flex flex-row gap-2 items-center"
                                          href={"/productos/" + selecciona.slug}
                                        >
                                          Ver producto
                                          <BsEyeFill />
                                        </a>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}

                    {!isMobile && (
                      //Si NO es movil
                      <>
                        <div className="flex flex-col w-full overflow-y-auto lg:w-1/2">
                          <AnimatePresence>
                            {selecciona && (
                              <>
                                <motion.div
                                  transition={{
                                    x: { type: "spring", stiffness: 100 },
                                    default: { duration: 0.5 },
                                  }}
                                  exit={{ x: "-100px", opacity: 0 }}
                                  initial={{
                                    x: "-100px",
                                    overflow: "hidden",
                                  }}
                                  animate={{
                                    x: 0,
                                    overflow: "hidden",
                                  }}
                                  className="flex flex-col items-center w-full "
                                >
                                  <div className="relative flex flex-row justify-center w-full">
                                    <div
                                      onClick={() => handleClickVolver()}
                                      className="volver"
                                    >
                                      <AiOutlineArrowLeft />
                                    </div>
                                    {selecciona.category.map((e, index) => (
                                      <span
                                        style={{
                                          backgroundColor:
                                            options[0]?.color_principal,
                                          color: options[0]?.color_secundario,
                                          padding: "2px 7px",
                                          marginRight: "5px",
                                          borderRadius: "20px",
                                          fontSize: "11px",
                                          fontFamily: options[0]?.fuente_global,
                                        }}
                                        className="categoria"
                                        key={index}
                                      >
                                        {e}
                                      </span>
                                    ))}
                                  </div>
                                  <button>
                                    {" "}
                                    <a href={"/productos/" + selecciona.slug}>
                                      <h1
                                        style={{
                                          color: "black",
                                          fontSize: "18px",
                                          fontFamily: options[0]?.fuente_global,
                                          textAlign: "center",
                                          marginTop: "7px",
                                          marginBottom: "7px",
                                        }}
                                      >
                                        {selecciona.title}
                                      </h1>
                                    </a>
                                  </button>

                                  <Image
                                    src={selecciona.image}
                                    width="300px"
                                    height="300px"
                                    objectFit="contain"
                                    className="rounded mb-9"
                                  />
                                  <div className="flex flex-row items-center justify-center w-full my-9">
                                    <Collapse title="Información">
                                      <Text>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: selecciona.description,
                                          }}
                                        ></div>
                                      </Text>{" "}
                                    </Collapse>
                                  </div>
                                  <div className="flex flex-row items-center justify-center w-full">
                                    <div className="flex flex-col items-start justify-center w-1/2">
                                      <span
                                        style={{
                                          fontFamily: options[0]?.fuente_global,
                                          fontSize: "23px",
                                        }}
                                        className="precio"
                                      >
                                        Desde {selecciona.price}€
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-end justify-center w-1/2">
                                      <motion.button
                                        className="flex flex-row"
                                        whileHover={{
                                          backgroundColor: "transparent",
                                          color: options[0]?.color_principal,
                                          border:
                                            "1px solid " +
                                            options[0]?.color_principal,
                                        }}
                                        initial={{
                                          backgroundColor:
                                            options[0]?.color_principal,
                                          color: options[0]?.color_secundario,
                                          padding: "10px 20px",
                                          borderRadius: "20px",
                                          fontFamily: options[0]?.fuente_global,
                                          fontSize: "14px",
                                        }}
                                      >
                                        <a
                                          className="flex flex-row gap-2 items-center"
                                          href={"/productos/" + selecciona.slug}
                                        >
                                          Ver producto
                                          <BsEyeFill />
                                        </a>
                                      </motion.button>
                                    </div>
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </InstantSearch>
      <style jsx>{`
        .sombreado {
          -webkit-box-shadow: 1px 1px 26px -6px rgba(61, 61, 61, 0.72);
          box-shadow: 1px 1px 26px -6px rgba(61, 61, 61, 0.72);
        }
        .volver {
          position: absolute;
          top: 2px;
          left: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default function AlgoliaSearch() {
  const [state, setState] = useState(false);
  const { options } = useOptions();
  //Creamos un useState que sera el que iremos cambiando dentro del contexto, en el return, adjudicaremos el setter y el objeto al value del provider
  const [estadoDelContexto, setestadoDelContexto] = useState(null);

  return (
    <>
      <SelectedContext.Provider
        value={{
          selecciona: estadoDelContexto,
          setSeleccionado: setestadoDelContexto,
        }}
      >
        <button onClick={() => setState(true)}>
          <AiOutlineSearch color={options[0]?.color_texto_header} size="21px" />
        </button>
        <AnimatePresence>
          {state && <SearchPanel cerrar={setState} />}
        </AnimatePresence>
      </SelectedContext.Provider>
    </>
  );
}
