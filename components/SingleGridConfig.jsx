import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import { useState } from "react";
import { motion } from "framer-motion";
import Precio from "./Precio";
import { useDispatch } from "react-redux";
import { useVariations } from "../hooks/useVariations";

const SingleGridConfig = ({ producto, opciones }) => {
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
      className="flex flex-col mx-5 z-[21] w-full h-[508px] max-h-[508px]  max-w-[404px]"
    >
      <>
        <div className="relative w-full max-h-[508px] h-full max-w-[404px]">
          <div className="flex flex-col p-7">
            <span
              style={{
                color: cambioImagen ? "#fff" : "#000",
                fontFamily: opciones.fuente_global,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              className="z-[99]"
            >
              {producto?.name}
            </span>

            <Precio
              precio={producto?.regular_price}
              rebaja={producto?.sale_price}
              hover={cambioImagen}
              opciones={opciones}
              variable={producto?.type === "variable"}
              variaciones={variacion}
            />
          </div>
          <Image
            objectFit="cover"
            layout="fill"
            src={producto?.images[0].src}
          ></Image>
        </div>
      </>
      <motion.button
        initial={{
          backgroundColor: "black",
          fontFamily: opciones?.fuente_global,
          color: "white",
          padding: "10px 20px",
          textTransform: "uppercase",
          margin: "20px 10px",
          border: "1px solid black",
        }}
        whileHover={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        }}
      >
        Añadir
      </motion.button>
    </div>
  );
};
export default SingleGridConfig;
