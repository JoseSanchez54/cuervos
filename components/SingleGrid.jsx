import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Precio = dynamic(() => import("../components/Precio"));
import { useDispatch } from "react-redux";

const SingleGrid = ({ producto, opciones }) => {
  const [cambioImagen, setCambioImagen] = useState(false);
  const dispatch = useDispatch();

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
  return (
    <AnimatePresence>
      <div
        style={{ cursor: "pointer" }}
        onMouseOver={(e) => setCambioImagen(true)}
        onMouseLeave={(e) => setCambioImagen(false)}
        className="flex flex-col z-[21] w-full h-[508px] max-h-[508px]  max-w-[404px]"
      >
        <Link href={`/productos/${producto?.slug}`} passHref>
          <>
            <div className="relative w-full max-h-[508px] h-full max-w-[404px]">
              <div className="flex flex-col p-7">
                <Link href={`/productos/${producto?.slug}`}>
                  <span
                    style={{
                      color: cambioImagen ? "#fff" : "#000",
                      fontFamily: opciones.fuente_global,
                      textTransform: "uppercase",
                    }}
                    className="z-[10]"
                  >
                    {producto?.name}
                  </span>
                </Link>
                <Precio
                  precio={producto?.regular_price}
                  rebaja={producto?.sale_price}
                  hover={cambioImagen}
                  opciones={opciones}
                />
                <Link
                  variants={texto}
                  initial="initial"
                  whileHover="hover"
                  href={`/productos/${producto?.slug}`}
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
              {hover && (
                <Image
                  objectFit="cover"
                  layout="fill"
                  src={!cambioImagen ? producto?.images[0].src : hover}
                ></Image>
              )}
            </div>
          </>
        </Link>
      </div>
      <style jsx>{`
        @media (max-width: 1022px) {
        }
      `}</style>
    </AnimatePresence>
  );
};
export default SingleGrid;
