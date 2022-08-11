import { addToCart } from "../utils/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AddToCart = ({ seleccion, lista, producto, opciones, precio }) => {
  const [sus, setSus] = useState(null);
  const [error, setError] = useState("");

  const actualCart = useSelector((state) => state.cartReducer.cart);
  useEffect(() => {
    actualCart.map((item, index) => {
      const periodo = item?.meta_data?.find(
        (meta) => meta?.key === "_subscription_period"
      )?.value;
      const intervalo = item?.meta_data?.find(
        (meta) => meta?.key === "_subscription_period_interval"
      )?.value;

      if (periodo && intervalo) {
        setSus({
          periodo,
          intervalo,
        });
      } else {
        setSus(null);
      }
    });
  }, [actualCart]);

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

      if (producto.type === "variable-subscription") {
        productoAdd = {
          ...productoAdd,
          nombrePadre: producto.name,
          idPadre: producto.id,
          variable: true,
        };
        const periodo = productoAdd?.meta_data?.find(
          (meta) => meta?.key === "_subscription_period"
        )?.value;
        const intervalo = productoAdd?.meta_data?.find(
          (meta) => meta?.key === "_subscription_period_interval"
        )?.value;
        if (sus?.intervalo === intervalo || actualCart.length === 0 || !sus) {
          dispatch({
            type: "@AddToCart",
            producto: productoAdd,
          });
          setError("");
        } else {
          setError(
            "No puedes agregar productos de diferente intervalo de facturación"
          );
        }
      } else {
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
      }
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
      <div className="flex flex-col w-full">
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
        <div className="flex flex-row w-full">
          {" "}
          {error && (
            <>
              <span
                style={{
                  fontFamily: opciones.fuente_global,
                }}
                className="block w-full my-3"
              >
                {error}
              </span>
            </>
          )}
        </div>
      </div>

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
