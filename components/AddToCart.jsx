import { addToCart } from "../utils/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";

const AddToCart = ({ seleccion, lista, producto, opciones, precio }) => {
  const [sus, setSus] = useState({});
  const actualCart = useSelector((state) => state.cartReducer.cart);
  actualCart.map((item) => {
    const periodo = item?.meta_data?.find(
      (meta) => meta?.key === "_subscription_period"
    )?.value;
    const customer_id = item?.meta_data?.find(
      (meta) => meta?.key === "_stripe_customer_id"
    )?.value;
  });
  console.log(actualCart);
  const variable = producto.attributes.length > 0;
  const dispatch = useDispatch();
  if (variable) {
    const productoAdd = addToCart(seleccion, lista);
    if (productoAdd?.on_sale) {
      precio(productoAdd?.sale_price);
    } else {
      precio(productoAdd?.regular_price);
    }
  } else {
    if (producto.on_sale) {
      precio(producto?.sale_price);
    } else {
      precio(producto?.regular_price);
    }
  }

  const handleCart = () => {
    if (variable) {
      const productoAdd = addToCart(seleccion, lista);
      productoAdd = {
        ...productoAdd,
        nombrePadre: producto.name,
        idPadre: producto.id,
        variable: true,
        img: producto.images[0].src,
      };

      dispatch({
        type: "@AddToCart",
        producto: productoAdd,
      });
    } else {
      producto = {
        ...producto,
        nombrePadre: producto.name,
        idPadre: producto.id,
        variable: true,
      };
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
          backgroundColor: "transparent",
          color: "black",
          border: "1px solid black",
        }}
        onClick={() => handleCart()}
      >
        <span>COMPRAR AHORA</span>
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
