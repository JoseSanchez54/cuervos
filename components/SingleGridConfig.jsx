import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
import { useState } from "react";
import { motion } from "framer-motion";
import Precio from "./Precio";
import { useDispatch } from "react-redux";
import { useVariations } from "../hooks/useVariations";
import { useSelector } from "react-redux";

const SingleGridConfig = ({ producto, opciones, botellas }) => {
  const actual = useSelector((state) => state.configReducer.cart);
  const cantidad = actual.filter((e) => e.id === producto.id).length;
  const dispatch = useDispatch();
  const { variacion } = useVariations(producto?.id);
  const handleBotellas = (e) => {
    if (botellas.value < botellas.caja) {
      botellas.set(botellas.value + 1);
      dispatch({
        type: "@Add",
        producto: producto,
      });
    }
  };

  const handleEliminar = () => {
    dispatch({
      type: "@Remove",
      id: producto.id,
      precio: producto.price,
      peso: producto.weight,
    });
    botellas.set(botellas.value - 1);
  };
  const [cambioImagen, setCambioImagen] = useState(false);
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
          </div>
          <div
            style={{
              backgroundColor: "black",
              borderRadius: "100%",
              padding: "5px 5px",
              height: "30px",
              width: "30px",
            }}
            className="absolute flex flex-row justify-center items-center z-[99] right-0 top-2"
          >
            <span
              style={{
                color: "white",
                fontFamily: opciones.fuente_global,
              }}
            >
              {cantidad}
            </span>
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

          border: "1px solid black",
        }}
        whileHover={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        }}
        onClick={() => handleBotellas(1)}
      >
        Añadir
      </motion.button>
      <motion.button
        initial={{
          backgroundColor: "black",
          fontFamily: opciones?.fuente_global,
          color: "white",
          padding: "10px 20px",
          textTransform: "uppercase",
          marginTop: "10px",

          border: "1px solid black",
        }}
        whileHover={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        }}
        onClick={() => handleEliminar()}
      >
        Eliminar
      </motion.button>
    </div>
  );
};
export default SingleGridConfig;
