import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import useMobile from "../hooks/useMobile";
import { IoIosCart } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
const FormularioCheckout = dynamic(() => import("./Checkout"), {
  ssr: false,
});
const Image = dynamic(() => import("next/image"), {
  ssr: false,
});

const MiniCart = ({ opciones, tasas }) => {
  const { isMobile } = useMobile();
  const dispatch = useDispatch();
  const actualCart = useSelector((state) => state.cartReducer.cart);

  const total = useSelector((state) => state.cartReducer.total);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const handleCheckout = (checkout) => {
    setCheckout(!checkout);
  };

  let clasesEntrada =
    "animate__slideInRight fixed h-full z-50 menu_desplegado animate__animated p-5";
  let clasesSalida =
    "animate__slideOutRight fixed h-full z-50 menu_desplegado  animate__animated p-5";
  let claseAltoFill = "flex flex-col justify-between alto";
  let claseAltoEmpty = "flex flex-col justify-center alto";
  let claseAltoOut = "flex flex-col justify-start alto";
  const controlDeClases = () => {
    if (actualCart?.length > 0 && !checkout) {
      return claseAltoFill;
    } else if (actualCart?.length === 0 && !checkout) {
      return claseAltoEmpty;
    } else if (actualCart?.length > 0 && checkout) {
      return claseAltoOut;
    }
  };

  const cantidad = actualCart?.length;
  const handle = () => {
    if (open === true) {
      return clasesEntrada;
    } else {
      return clasesSalida;
    }
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const vaciarF = () => {
    dispatch({ type: "@EMPTY_CART" });
  };

  return (
    <>
      <div className="flex justify-end p-2 pr-5 mt-1">
        <span onClick={() => handleOpen()} className="minicartD">
          <IoIosCart size="25px" />
          {cantidad !== 0 && (
            <span className="bubble animate__animated animate__bounceIn">
              {cantidad}
            </span>
          )}
        </span>
      </div>

      {open && (
        <AnimatePresence>
          <motion.div
            initial={{
              right: "-100%",
              maxWidth: "100%",
              width: "430px",
              backgroundColor: "#21201f",
              top: 0,
              zIndex: 9999,
              overflowY: "hidden",
            }}
            animate={{
              right: 0,
            }}
            exit={{
              right: "-100%",
            }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={handle()}
          >
            <div className="flex flex-col md:h-full md:justify-start menucont menuFijo">
              <div className="w-full">
                <CgClose
                  onClick={() => handleOpen()}
                  size="50px"
                  color="#fff"
                  className="cursor-pointer"
                />
              </div>
              <div className={controlDeClases()}>
                {actualCart?.length === 0 && !checkout && (
                  <>
                    <span className="mensajeEnviado">
                      Tu carrito está vacio
                    </span>
                  </>
                )}

                <div className="flex flex-col justify-start mt-5 miniCartWrapper">
                  {actualCart?.length !== 0 &&
                    actualCart?.map((producto, index) => {
                      const { attributes, id, image, price, sku, sale_price } =
                        producto;
                      return (
                        <div
                          className={
                            index === 0
                              ? "flex flex-col justify-start w-full md:flex-row producto1"
                              : "flex flex-col justify-start w-full md:flex-row producto "
                          }
                          key={index}
                        >
                          <div className="flex flex-row justify-between w-full mt-5 md:flex-row md:mt-0">
                            <div className="flex flex-col justify-center pl-5 mt-5 text-center md:text-start md:mt-0">
                              <span className="miniCartName">
                                {producto?.nombrePadre}
                              </span>
                              <span className="miniCartPrice">{price}€</span>
                              <div className="flex flex-row mt-2">
                                <div className="flex flex-col w-full">
                                  {attributes?.map((e) => {
                                    if (e?.name === "Botellas") {
                                      return (
                                        <>
                                          <span className="label">
                                            Botellas:
                                          </span>
                                          <span className="option">
                                            {e?.option}
                                          </span>
                                        </>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center justify-start">
                              {!checkout && (
                                <BiTrash
                                  onClick={() =>
                                    dispatch({
                                      type: "@RemoveFromCart",
                                      id: producto.id,
                                      precio: price,
                                      peso: producto.weight,
                                    })
                                  }
                                  size="20px"
                                  color="#fff"
                                  className="cursor-pointer"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {checkout && (
                    <>
                      <FormularioCheckout
                        tasas={tasas}
                        onAction={handleCheckout}
                      />
                    </>
                  )}

                  {actualCart?.length !== 0 && !checkout && (
                    <>
                      <button onClick={() => vaciarF()} className="vacio">
                        Vaciar carrito
                      </button>
                      <span className="mt-5 text-center precioTotal">
                        Total: {total}€
                      </span>
                      {isMobile && (
                        <div className="flex flex-row justify-center">
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleCheckout(checkout)}
                              className="mt-2 botonComprar mb-9"
                            >
                              Finalizar compra
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {!isMobile && actualCart?.length !== 0 && !checkout && (
                  <div className="flex flex-row justify-center">
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleCheckout(checkout)}
                        className="mt-2 botonComprar "
                      >
                        Finalizar compra
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      <style jsx>{`
        .vacio {
          color: #fff;
          text-decoration: underline;
        }
        .menucont.menu2 {
          align-content: initial;
        }
        .alto {
          height: calc(100vh - 160px);
        }
        .precioTotal {
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
          font-family: ${opciones.fuente_titulos};
        }
        .overlay {
          width: 100vw;
          height: 100vh;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
        }
        .newsletter {
          width: 350px;
          position: absolute;
          bottom: 35%;
          right: 480px;
        }
        .rels {
          display: flex !important;
        }
        .mensajeEnviado {
          font-family: ${opciones.fuente_titulos};
          line-height: 1;
          color: white;
          font-weight: bold;
          font-size: 100px;
        }
        .miniCartWrapper {
          overflow-y: auto;
          scrollbar-color: red grey;
          scrollbar-width: thin;
        }
        .menuenlace {
          text-decoration: none;
          color: #fff;
          font-size: calc(38px + (100 - 27) * (100vh - 320px) / (2560 - 320));
          line-height: calc(30px + (102 - 13) * (100vh - 320px) / (2560 - 320));
          margin: 25px 0px;
          display: block;
          font-family: ${opciones.fuente_titulos};
          z-index: 9;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .copyright {
          display: flex;
          flex-direction: column;
          position: absolute;
          bottom: 5%;
          right: 430px;
        }
        .copy {
          display: block;
          color: #000;
          z-index: 9999999;
          font-weight: bold;
          font-size: calc(25px + (100 - 27) * (100vh - 320px) / (2560 - 320));
          line-height: calc(25px + (102 - 13) * (100vh - 320px) / (2560 - 320));
        }
        .producto {
          border-bottom: 1px solid #3a3a3a;
          margin-bottom: 21px;
        }
        .producto1 {
          border-top: 1px solid #3a3a3a;
          border-bottom: 1px solid #3a3a3a;
          padding-top: 21px;
          margin-bottom: 21px;
        }
        @media (max-width: 768px) {
          .menuenlace {
            font-size: calc(25px + (100 - 27) * (100vh - 320px) / (2560 - 320));
            line-height: calc(
              20px + (102 - 13) * (100vh - 320px) / (2560 - 320)
            );
          }
        }
        .menuenlace:hover::before {
          content: "''";
        }
        .menuenlace:hover::after {
          content: "''";
        }
        .footer1 {
          width: 90%;
        }
        .menu_desplegado {
          max-width: 100%;
          width: 430px;
          background-color: #21201f;
          top: 0;
          right: 0;
          z-index: 9999;
          overflow-y: hidden;
        }
        .menucont:-webkit-scrollbar {
          display: none;
        }
        .footermwlb {
          bottom: 0;

          margin-top: 20px;
        }
        .menucont {
          max-width: 400px;
          overflow-x: hidden;
          flex-wrap: wrap;
          align-content: space-between;
          display: flex;
        }
        @media (max-width: 768px) {
          .menucont {
            overflow-x: hidden;
            overflow-y: auto;
          }
        }
        .enlacepoliticas {
          display: block;

          text-decoration: none;
          color: rgb(154, 152, 152) !important;
          font-size: 12px;
          line-height: 25px;
          text-align: end;
        }
        .legales {
          position: relative;
          bottom: 20px;
        }
        .direcciones {
          margin-top: 30px;
        }
        .direcciones span {
          display: block;
          font-family: ${opciones.fuente_titulos};
          text-align: end;
          color: rgb(154, 152, 152) !important;
          font-size: 12px;
          line-height: 21px;
        }
        .tituloContacto {
          color: white;
          font-family: ${opciones.fuente_titulos};
          font-size: calc(42px + (100 - 27) * (100vh - 320px) / (2560 - 320));
          width: 100%;
          font-style: italic;
          line-height: calc(35px + (102 - 13) * (100vh - 320px) / (2560 - 320));
          font-weight: bold;
          display: block;
        }

        .titularCont {
          margin-top: 30%;
          padding-left: 5%;
        }
        .miniCartPrice {
          font-size: 20px;
          font-weight: normal;
          color: #fff;
          font-family: ${opciones.fuente_titulos};
        }
        .miniCartName {
          font-size: 30px;

          font-weight: normal;
          color: #fff;
          font-family: ${opciones.fuente_titulos};
        }
        .minicartD {
          font-family: ${opciones.fuente_titulos};
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
        }
        .logocopy {
          width: auto;
          height: 64px;
          margin-top: 6px;
        }
        .botonComprar {
          font-family: ${opciones.fuente_titulos};
          color: #fff;
          font-size: 25px;
          background-color: black;
          padding: 10px 20px;
          border-radius: 15px;
        }
        .botonComprar:hover {
          color: #fff;
          background-color: #e00000;
        }
        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: red;
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #b30000;
        }
        /* width */
        ::-moz-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-moz-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          -webkit-box-shadow: inset 0 0 5px grey;
          border-radius: 10px;
        }

        /* Handle */
        ::-moz-scrollbar-thumb {
          background: red;
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-moz-scrollbar-thumb:hover {
          background: #b30000;
        }
        .bubble {
          position: absolute;
          width: 20px;
          height: 20px;
          font-family: ${opciones.fuente_titulos};
          font-size: 13px;
          top: 19px;
          background-color: #000000;
          color: #fff;
          border-radius: 100%;
          padding: -1px;
          display: block;
          text-align: center;
          line-height: 20px;
          margin-left: 12px;
        }
        .label {
          color: #fff;
          font-size: 13px;
          font-family: ${opciones.fuente_titulos};
          font-weight: bold;
        }
        .option {
          color: #fff;
          font-size: 12px;
          font-family: ${opciones.fuente_titulos};
          font-weight: normal;
        }
        @media (max-width: 768px) {
          .tituloContacto {
            width: 80%;
          }
          .titularCont {
            margin-top: 2%;
          }
        }
        @media (max-width: 1000px) {
          .copyright,
          .newsletter {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default MiniCart;
