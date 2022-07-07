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

  const [precio, setPrecio] = useState({
    precio: newV.regular_price,
    rebaja: newV.sale_price,
  });
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
  useEffect(() => {
    setPrecio({
      precio: newV.regular_price,
      rebaja: newV.sale_price,
    });
  }, [seleccion]);

  return (
    <>
      <div className="flex flex-row z-[12] w-full gap-2 justify-between md:justify-start suma flex-nowrap">
        <div className="flex flex-col justify-center items-center">
          {variable ? (
            <>
              {precio.rebaja !== "" ? (
                <>
                  <div className="flex gap-3 flex-row items-center">
                    <div className="relative">
                      {" "}
                      <span
                        style={{
                          fontFamily: opciones[0].fuente_global,
                          fontWeight: "bold",
                          fontSize: "18px",
                          textDecoration: "line-through",
                          opacity: "0.5",
                        }}
                      >
                        {precio.precio}€
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: opciones[0].fuente_global,
                        fontWeight: "bold",
                        fontSize: "23px",
                      }}
                    >
                      {precio.rebaja}€
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <span
                    style={{
                      fontFamily: opciones[0].fuente_global,
                      fontWeight: "bold",
                      fontSize: "23px",
                    }}
                  >
                    {precio.precio}€
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              {producto.sale_price === "" ? (
                <>
                  <span
                    style={{
                      fontFamily: opciones[0].fuente_global,
                      fontWeight: "bold",
                      fontSize: "23px",
                    }}
                  >
                    {precio.precio}€
                  </span>
                </>
              ) : (
                <>
                  <span
                    style={{
                      fontFamily: opciones[0].fuente_global,
                      fontWeight: "bold",
                      fontSize: "23px",
                    }}
                  >
                    {precio.rebaja}€
                  </span>
                </>
              )}
            </>
          )}
        </div>
        <div
          style={{
            border: "1px solid #e6e6e6",
          }}
          className="flex flex-row items-center border-2 rounded-full"
        >
          <div className="flex flex-col justify-center">
            <button
              onClick={() => setValor(valor > 1 ? parseInt(valor) - 1 : 1)}
              style={{
                fontSize: "20px",
              }}
            >
              -
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              style={{
                maxWidth: "20px",
                appearance: "none",
                WebkitAppearance: "none",
                textAlign: "center",
                backgroundColor: "transparent",
              }}
              type="number"
              onChange={(e) => setValor(e.target.value)}
              defaultValue={1}
              value={valor}
              min="1"
            ></input>
          </div>
          <div className="flex flex-col justify-center">
            <button
              onClick={() => setValor(parseInt(valor) + 1)}
              style={{
                fontSize: "20px",
              }}
            >
              +
            </button>
          </div>
        </div>
        <motion.button
          initial={{
            fontFamily: opciones[0].fuente_global,
            backgroundColor: opciones[0].color_boton,
            color: opciones[0].color_boton_hover,
            padding: "10px 20px",
            borderRadius: "5px",
            maxWidth: "300px",
          }}
          whileHover={{
            backgroundColor: opciones[0].color_boton_hover,
            color: opciones[0].color_boton,
            border: "1px solid",
            borderColor: opciones[0].color_boton,
          }}
          whileTap={{
            backgroundColor: opciones[0].color_boton_hover,
            color: opciones[0].color_boton,
            border: "1px solid",
            borderColor: opciones[0].color_boton,
          }}
          onClick={() => handleCart()}
        >
          {isMobile ? <BsCartPlus /> : <span>Añadir al carrito</span>}
        </motion.button>
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
