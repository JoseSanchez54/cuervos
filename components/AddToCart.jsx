import { addToCart } from "../utils/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AddToCart = ({ seleccion, lista, producto, opciones, precio }) => {
  const [sus, setSus] = useState(null);
  const [error, setError] = useState("");
  const [texto, setTexto] = useState("COMPRAR AHORA");
  if (texto !== "COMPRAR AHORA") {
    setTimeout(() => setTexto("COMPRAR AHORA"), 2000);
  }
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
    setTexto("AÑADIDO");
    if (variable) {
      const productoAdd = addToCart(seleccion, lista);
      console.log(producto.categories[0].name);

      if (producto.type === "variable-subscription") {
        productoAdd = {
          ...productoAdd,
          nombrePadre: producto.name,
          idPadre: producto.id,
          variable: true,
        };
        const productToFB = {
          content_ids: productoAdd.id,
          content_type: "product",
          value: productoAdd.price,
          currency: "EUR",
          content_category: producto.categories[0].name,
          contents: {
            id: productoAdd.id,
            quantity: 1,
          },
        };
        import("react-facebook-pixel")
          .then((module) => module.default)
          .then((ReactPixel) => {
            ReactPixel.track("AddToCart", productToFB);
          });

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
        const productToFB = {
          content_ids: producto.id,
          content_type: "product",
          value: producto.price,
          currency: "EUR",
          content_category: producto.categories[0].name,
          contents: {
            id: producto.id,
            quantity: 1,
          },
        };

        import("react-facebook-pixel")
          .then((module) => module.default)
          .then((ReactPixel) => {
            ReactPixel.track("AddToCart", productToFB);
          });

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
      const productToFB = {
        content_ids: producto.id,
        content_type: "product",
        value: producto.price,
        currency: "EUR",
        content_category: producto.categories[0].name,
        contents: {
          id: producto.id,
          quantity: 1,
        },
      };
      import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
          ReactPixel.track("AddToCart", productToFB);
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
          <span>{texto}</span>
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
