import { addToCart } from "../utils/addToCart";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import useMobile from "../hooks/useMobile";

const AddToCart = ({ seleccion, lista, producto, opciones }) => {
  const variable = producto.attributes.length > 0;
  const { isMobile } = useMobile();
  const [valor, setValor] = useState(1);
  const productoA = () => {
    if (variable) {
      return addToCart(seleccion, lista, producto);
    } else {
      return producto;
    }
  };
  const newV = productoA();

  const dispatch = useDispatch();
  const handleCart = () => {
    if (variable) {
      const productoAdd = addToCart(seleccion, lista);
      dispatch({
        type: "@AddToCart",
        producto: productoAdd,
      });
    } else {
      dispatch({
        type: "@AddToCart",
        producto: producto,
      });
    }
  };

  return (
    <>
      <motion.button
        initial={{
          color: "white",
          padding: "15px",
          backgroundColor: "black",
          fontFamily: opciones.fuente_global,
          border: "2px solid transparent",
        }}
        whileHover={{
          color: "black",
          backgroundColor: "transparent",
          border: "2px solid black",
        }}
        transition={{ type: "spring", stiffness: 100 }}
        className="block w-full "
        whileTap={{
          backgroundColor: opciones.color_boton_hover,
          color: opciones.color_boton,
          border: "1px solid",
          borderColor: opciones.color_boton,
        }}
        onClick={() => handleCart()}
      >
        {isMobile ? <BsCartPlus /> : <span>COMPRAR AHORA</span>}
      </motion.button>

      <style jsx>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .suma .flex-col {
          padding: 10px;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
};
export default AddToCart;
