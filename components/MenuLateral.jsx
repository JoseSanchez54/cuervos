import { GiHamburgerMenu } from "react-icons/gi/";
import { useState } from "react";
import useMobile from "../hooks/useMobile";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr/";
const MenuLateral = ({ opciones }) => {
  const { isMobile } = useMobile();
  const [abrir, setAbrir] = useState(false);
  const [seccion, setSeccion] = useState(null);
  const handleSeccion = (seccion) => {
    setSeccion(seccion);
  };

  const handleAbrir = () => {
    setAbrir(!abrir);
  };
  const menuBruto = Object.values(opciones.menu_rep).map((key) => {
    return key;
  });

  return (
    <>
      {!abrir ? (
        <button>
          <GiHamburgerMenu onClick={(e) => handleAbrir()} size="25px" />
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{
              left: "-100%",
              minWidth: isMobile ? "100vw" : "900px",
              height: "100vh",
              position: "fixed",
              top: 0,
              bottom: 0,
              backgroundColor: "white",
              zIndex: 9,
              cursor: "pointer",
            }}
            animate={{
              left: 0,
            }}
            exit={{
              left: "-100%",
            }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="menuDesplegado flex flex-row "
          >
            {isMobile ? (
              !seccion ? (
                <div className="flex flex-col lg:w-1/2 w-full h-full">
                  <div className="flex flex-row justify-between items-center w-full p-9  borde-b ">
                    <Link href="/">
                      <a>
                        <Image
                          width="85px"
                          height="63px"
                          src={opciones.logo_principal}
                        ></Image>
                      </a>
                    </Link>
                    <button onClick={(e) => handleAbrir()}>
                      <GrClose />
                    </button>
                  </div>
                  <div className="flex flex-row w-full borde-b p-9 borde-t ">
                    <div className="flex flex-col w-full gap-5 justify-between">
                      <button
                        style={{ textAlign: "start" }}
                        onClick={(e) => handleSeccion("categorias")}
                      >
                        <a className="enlaceSup">Categorías</a>
                      </button>
                      <button
                        style={{ textAlign: "start" }}
                        onClick={(e) => handleSeccion("actividad")}
                      >
                        <a className="enlaceSup">Actividad</a>
                      </button>
                      <button
                        style={{ textAlign: "start" }}
                        onClick={(e) => handleSeccion("ediciones")}
                      >
                        <a className="enlaceSup">Ediciones</a>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row p-9 w-full">
                    <div className="flex flex-col gap-3 w-full">
                      {menuBruto.map((e) => {
                        return (
                          <>
                            <Link href={e.enlace}>
                              <a className="enlaceBot">{e.label}</a>
                            </Link>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            ) : (
              <div className="flex flex-col lg:w-1/2 w-full h-full">
                <div className="flex flex-row justify-between items-center w-full lg:p-9 p-1  borde-b ">
                  <Link href="/">
                    <a>
                      <Image
                        width="85px"
                        height="63px"
                        src={opciones.logo_principal}
                      ></Image>
                    </a>
                  </Link>
                  <button onClick={(e) => handleAbrir()}>
                    <GrClose />
                  </button>
                </div>
                <div className="flex flex-row w-full borde-b p-9 borde-t ">
                  <div className="flex flex-col w-full gap-5 justify-between">
                    <Link href="/categorias">
                      <a className="enlaceSup">Categorías</a>
                    </Link>
                    <Link href="/act">
                      <a className="enlaceSup">Actividad</a>
                    </Link>
                    <Link href="/act">
                      <a className="enlaceSup">Ediciones</a>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row p-9 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    {menuBruto.map((e) => {
                      return (
                        <>
                          <Link href={e.enlace}>
                            <a className="enlaceBot">{e.label}</a>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {isMobile ? (
              <></>
            ) : (
              <>
                {!seccion && (
                  <div className="lg:flex flex-col lg:w-1/2 w-full hidden">
                    <div className="relative h-screen w-full">
                      {opciones.imagen_promocion && (
                        <>
                          <div className="flex flex-col justify-end h-full">
                            <span className="promoTitle">
                              {opciones.titulo_promocion}
                            </span>
                            <button className="buyNow">
                              <Link href="/tienda">
                                <a>Comprar ahora</a>
                              </Link>
                            </button>
                            <div className="overlay w-full h-screen"></div>
                            <Image
                              objectFit="cover"
                              layout="fill"
                              src={opciones.imagen_promocion}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <style jsx>{`
        .menuDesplegado {
          min-width: 900px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          background-color: white;
          z-index: 9;
          cursor: "pointer";
        }
        .borde-b {
          border-bottom: 1px solid #e0e0e0;
        }
        .borde-t {
          border-top: 1px solid #e0e0e0;
        }
        a.enlaceSup {
          font-family: ${opciones.fuente_global};
          color: ${opciones.color_texto_header};
          font-size: 2em;
          font-weight: bold;
          background-position: 0% 100%;
          background-repeat: no-repeat;
          background-size: 0% 2px;
          transition: background-size 0.3s;
        }
        .enlaceBot {
          font-family: ${opciones.fuente_global};
          color: ${opciones.color_texto_header};
          font-size: 1.1em;
        }
        a:hover {
          color: ${opciones.color_texto_header_hover};
          background-size: 100% 2px;
        }
        .overlay {
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 2;
        }
        .promoTitle {
          font-family: ${opciones.fuente_global};
          color: white;
          font-size: 2em;
          z-index: 3;
          padding-left: 20px;
        }
        .buyNow {
          font-family: ${opciones.fuente_global};
          z-index: 3;
          display: flex;
          padding-left: 20px;
          padding-bottom: 20px;
          color: white;
        }
        .buyNow a {
          color: white;
          text-decoration: none;
          background-image: linear-gradient(currentColor, currentColor);
          background-position: 0% 100%;
          background-repeat: no-repeat;
          background-size: 0% 2px;
          transition: background-size 0.3s;
        }
        .buyNow:hover a {
          background-size: 100% 2px;
        }
        @media (max-width: 1023px) {
          .menuDesplegado {
            min-width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            background-color: white;
          }
        }
      `}</style>
    </>
  );
};
export default MenuLateral;
