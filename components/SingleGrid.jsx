import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Precio from "../components/Precio";
import { useDispatch } from "react-redux";
import { useVariations } from "../hooks/useVariations";

const SingleGrid = ({ producto, opciones }) => {
  const { variacion } = useVariations(producto?.id);

  const [cambioImagen, setCambioImagen] = useState(false);
  const dispatch = useDispatch();
  function definirVariaciones(p, v) {
    const atributos = p.attributes
      .filter((e, index) => e.variation === true)
      .map((e) => {
        const objeto = {
          nombre: e.name,
          opciones: e.options,
        };
        const variable = true;
        return {
          ...objeto,
          variable,
        };
      });

    return atributos;
  }
  //const atributos = definirVariaciones(producto, variaciones);

  const textMotion = {
    initial: {
      fontFamily: opciones.fuente_global,
      zIndex: "10",
      color: cambioImagen ? "#fff" : "#000",
      display: "flex",
      border: cambioImagen ? "1px solid #fff" : "1px solid #000",
      width: "fit-content",
      padding: "10px 20px",
      marginTop: "10px",
    },
    hover: { backgroundColor: "#000", color: "#fff", border: "1px solid #000" },
  };
  const boton = {
    initial: { visibility: "hidden" },
    hover: { visibility: "visible" },
  };
  const caja = {
    initial: { height: "119px" },
    hover: { height: "160px" },
  };
  const caja2 = {
    initial: { minHeight: "231px" },
    hover: { minHeight: "190px" },
  };

  return (
    <AnimatePresence>
      <motion.div
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 0.3 },
          type: "spring",
          stiffness: 100,
        }}
        initial="initial"
        whileHover="hover"
        key={producto?.id}
        style={{ cursor: "pointer", borderRadius: "20px" }}
        className="flex flex-col z-[21] w-full    max-w-[232px]"
      >
        <Link
          href={{
            pathname: "/productos/[slug]",
            query: { slug: producto?.slug },
          }}
        >
          <>
            <motion.div
              variants={caja2}
              style={{
                borderRadius: "20px 20px 0px 0px",
              }}
              className="flex   relative flex-row w-full"
            >
              <Image
                style={{
                  borderRadius: "20px 20px 0px 0px",
                }}
                objectFit="cover"
                layout="fill"
                src={producto?.images[0].src}
              ></Image>
            </motion.div>
            <>
              <motion.div
                variants={caja}
                style={{
                  backgroundColor: "#F5F5F7",
                  borderRadius: "0 0 20px 20px",
                }}
                className="relative flex flex-row  w-full   max-w-[404px]"
              >
                <div className="flex items-center flex-col p-7">
                  <Link
                    href={{
                      pathname: "/productos/[slug]",
                      query: { slug: producto?.slug },
                    }}
                  >
                    <a className="z-[20] text-center mb-3">
                      <span
                        style={{
                          color: "#131214",
                          fontFamily: opciones.fuente_global,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "16px",
                        }}
                        className="z-[10]"
                      >
                        {producto?.name}
                      </span>
                    </a>
                  </Link>
                  <Precio
                    precio={producto?.regular_price}
                    rebaja={producto?.sale_price}
                    hover={cambioImagen}
                    opciones={opciones}
                    variable={producto?.type === "variable"}
                    variaciones={variacion}
                  />
                  <motion.div
                    transition={{
                      opacity: { ease: "linear" },
                      layout: { duration: 0.3 },
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="mt-4"
                    variants={boton}
                  >
                    <Link
                      href={{
                        pathname: "/productos/[slug]",
                        query: { slug: producto?.slug },
                      }}
                      passHref
                    >
                      <motion.a>
                        <motion.button
                          transition={{
                            opacity: { ease: "linear" },
                            layout: { duration: 0.3 },
                            type: "spring",
                            stiffness: 100,
                          }}
                          initial={{
                            fontFamily: opciones?.fuente_global,
                            color: "#ffffff",
                            backgroundColor: "#F7546C",
                            border: "1px solid #F7546C",
                            padding: "5px 25px",
                            borderRadius: "20px",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                          whileHover={{
                            fontFamily: opciones?.fuente_global,
                            color: "#F7546C",
                            backgroundColor: "transparent",
                            border: "1px solid #F7546C",
                            fontSize: "15px",
                          }}
                        >
                          COMPRAR
                        </motion.button>
                      </motion.a>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          </>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
export default SingleGrid;
