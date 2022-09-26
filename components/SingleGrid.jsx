import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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

  const hover = producto?.meta_data?.filter((res) => res.key === "imagenh")[0]
    ?.value;
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
  const texto = {
    initial: { color: cambioImagen ? "#fff" : "#000", zIndex: "10" },
    hover: { color: "#fff" },
  };

  const metadata = Object?.values(producto?.meta_data).map((key) => {
    return key;
  });
  const precioindividual = metadata?.filter(
    (m) => m.key === "precioindividual"
  )[0]?.value;
  const precioindividualrebaja = metadata?.filter(
    (m) => m.key === "precioindividualrebaja"
  )[0]?.value;

  return (
    <div
      key={producto?.id}
      style={{ cursor: "pointer" }}
      onMouseOver={(e) => setCambioImagen(true)}
      onMouseLeave={(e) => setCambioImagen(false)}
      className="flex flex-col z-[21] w-full h-[508px] max-h-[508px]  max-w-[404px]"
    >
      <Link
        href={{
          pathname: "/productos/[slug]",
          query: { slug: producto?.slug },
        }}
      >
        <a className="h-full">
          <>
            <div className="relative w-full max-h-[508px] h-full max-w-[404px]">
              <div className="flex flex-col p-7">
                <Link
                  href={{
                    pathname: "/productos/[slug]",
                    query: { slug: producto?.slug },
                  }}
                >
                  <a className="z-[20] mb-3">
                    <span
                      style={{
                        color: cambioImagen ? "#fff" : "#000",
                        fontFamily: opciones.fuente_global,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                      className="z-[10]"
                    >
                      {producto?.name}
                    </span>
                  </a>
                </Link>
                {producto?.categories[0]?.slug === "destacados" ? (
                  <Precio
                    precio={
                      precioindividual !== ""
                        ? precioindividual
                        : producto?.regular_price
                    }
                    rebaja={
                      precioindividualrebaja
                        ? precioindividualrebaja
                        : producto?.sale_price
                    }
                    hover={cambioImagen}
                    opciones={opciones}
                    variable={producto?.type === "variable"}
                    variaciones={variacion}
                    cat="destacados"
                  />
                ) : (
                  <Precio
                    precio={producto?.regular_price}
                    rebaja={producto?.sale_price}
                    hover={cambioImagen}
                    opciones={opciones}
                    variable={producto?.type === "variable"}
                    variaciones={variacion}
                  />
                )}

                <Link
                  variants={texto}
                  initial="initial"
                  whileHover="hover"
                  href={{
                    pathname: "/productos/[slug]",
                    query: { slug: producto?.slug },
                  }}
                  passHref
                >
                  <motion.a
                    variants={texto}
                    initial="initial"
                    whileHover="hover"
                  >
                    <button
                      style={{
                        fontFamily: opciones.fuente_global,
                        zIndex: "10",
                        fontSize: "12px",
                        color: cambioImagen ? "#fff" : "#000",
                        display: "flex",
                        border: cambioImagen
                          ? "1px solid #fff"
                          : "1px solid #000",
                        width: "fit-content",
                        padding: "10px 20px",
                        marginTop: "10px",
                        "&:hover": {
                          backgroundColor: "#000",
                          color: "#fff",
                        },
                      }}
                    >
                      COMPRAR
                    </button>
                  </motion.a>
                </Link>
              </div>

              <>
                {hover && (
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={!cambioImagen ? producto?.images[0].src : hover}
                  ></Image>
                )}
              </>
            </div>
          </>
        </a>
      </Link>
    </div>
  );
};
export default SingleGrid;
