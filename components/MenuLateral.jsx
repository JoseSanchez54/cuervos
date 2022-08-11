import { GiHamburgerMenu } from "react-icons/gi/";
import { useState, useEffect } from "react";
import useMobile from "../hooks/useMobile";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr/";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useOptions } from "../hooks/useOptions";
import useSWR from "swr";
import fetcherWc from "../utils/fetcherWc";
const MenuLateral = ({ opciones, categorias }) => {
  const { options } = useOptions(opciones);
  const categories = useSWR(
    "products/categories?order=desc&per_page=100&per_page=100",
    fetcherWc,
    {
      refreshInterval: 1000,
      fallbackData: categorias,
    }
  ).data;
  const { isMobile } = useMobile();
  const [abrir, setAbrir] = useState(false);
  const [seccion, setSeccion] = useState(null);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    setAbrir(false);
  }, [query]);
  const handleSeccion = (seccion) => {
    setSeccion(seccion);
  };

  const handleAbrir = () => {
    setAbrir(!abrir);
  };
  const menuBruto = Object?.values(options?.menu_rep).map((key) => {
    return key;
  });
  const padres = categories?.filter((res) => res.parent === 0);
  const hijos = categories?.filter((res) => res.parent === seccion);

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
              zIndex: 99,
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
                          src={options?.logo_principal}
                        ></Image>
                      </a>
                    </Link>
                    <button onClick={(e) => handleAbrir()}>
                      <GrClose />
                    </button>
                  </div>
                  <div className="flex flex-row w-full borde-b p-9 borde-t ">
                    <div className="flex flex-col w-full gap-5 justify-between">
                      {padres.map((res, index) => {
                        return (
                          <>
                            {res.slug !== "todos" && res.slug !== "destacados" && (
                              <button
                                key={index}
                                style={{ textAlign: "start" }}
                                onClick={(e) => handleSeccion(res.id)}
                              >
                                <a className="enlaceSup">{res.name}</a>
                              </button>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row p-9 w-full">
                    <div className="flex flex-col gap-3 w-full">
                      {menuBruto?.map((e, index) => {
                        return (
                          <Link key={index} href={e.enlace}>
                            <a className="enlaceBot uppercase">{e.label}</a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="flex flex-col lg:w-1/2 w-full h-full">
                    <div className="flex flex-row justify-between items-center w-full p-9  borde-b ">
                      <Link href="/">
                        <a>
                          <Image
                            width="85px"
                            height="63px"
                            src={options?.logo_principal}
                          ></Image>
                        </a>
                      </Link>
                      <button onClick={(e) => setSeccion(null)}>
                        <AiOutlineArrowLeft />
                      </button>
                    </div>
                    <div className="flex flex-row w-full borde-b p-9 borde-t ">
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="flex flex-col w-full gap-5 justify-between"
                      >
                        {hijos?.map((res, index) => {
                          if (hijos.length === 0) {
                            return <span>No hay más subcategorías</span>;
                          } else {
                            return (
                              <>
                                {res.slug !== "todos" && (
                                  <button
                                    key={index}
                                    style={{ textAlign: "start" }}
                                  >
                                    <Link
                                      key={index}
                                      href={"/categoria/" + res.slug}
                                    >
                                      <a className="enlaceSup test">
                                        {res.name}
                                      </a>
                                    </Link>
                                  </button>
                                )}
                              </>
                            );
                          }
                        })}
                      </motion.div>
                    </div>
                    <div className="flex flex-row p-9 w-full">
                      <div className="flex flex-col gap-3 w-full">
                        {menuBruto.map((e, index) => {
                          return (
                            <Link key={index} href={e.enlace}>
                              <a className="enlaceBot">{e.label}</a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </AnimatePresence>
              )
            ) : (
              <div className="flex flex-col lg:w-1/2 w-full h-full">
                <div className="flex flex-row justify-between items-center w-full lg:p-9 p-1  borde-b ">
                  <Link href="/">
                    <a>
                      <Image
                        width="85px"
                        height="63px"
                        src={options?.logo_principal}
                      ></Image>
                    </a>
                  </Link>
                  {!seccion ? (
                    <button onClick={(e) => handleAbrir()}>
                      <GrClose />
                    </button>
                  ) : (
                    <button onClick={(e) => setSeccion(null)}>
                      <AiOutlineArrowLeft />
                    </button>
                  )}
                </div>
                <div className="flex flex-row w-full borde-b p-9 borde-t ">
                  <div className="flex flex-col w-full gap-5 justify-between">
                    {padres.map((res, index) => {
                      return (
                        <>
                          {res.slug !== "todos" && res.slug !== "destacados" && (
                            <button
                              key={index}
                              style={{ textAlign: "start" }}
                              onClick={(e) => handleSeccion(res.id)}
                            >
                              <a className="enlaceSup">{res.name}</a>
                            </button>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-row p-9 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    {menuBruto.map((e, index) => {
                      return (
                        <Link key={index} href={e.enlace}>
                          <a className="enlaceBot">{e.label}</a>
                        </Link>
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
                {!seccion ? (
                  <AnimatePresence>
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="lg:flex flex-col lg:w-1/2 w-full hidden"
                    >
                      <div className="relative h-screen w-full">
                        {options?.imagen_promocion && (
                          <>
                            <div className="flex flex-col justify-end h-full">
                              <span className="promoTitle">
                                {options?.titulo_promocion}
                              </span>
                              <button className="buyNow">
                                <Link href="/categoria/todos">
                                  <a>Comprar ahora</a>
                                </Link>
                              </button>
                              <div className="overlay w-full h-screen"></div>
                              <Image
                                objectFit="cover"
                                layout="fill"
                                src={options?.imagen_promocion}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="lg:flex flex-col lg:w-1/2 w-full hidden"
                    >
                      <div className="relative h-screen w-full">
                        {options?.imagen_promocion && (
                          <>
                            <div className="flex flex-col justify-start gap-5 p-5 mt-[150px] h-full">
                              {hijos.map((res) => {
                                if (hijos.length === 0) {
                                  return <span>No hay más subcategorías</span>;
                                } else {
                                  return (
                                    <button style={{ textAlign: "start" }}>
                                      <Link href={"/categoria/" + res.slug}>
                                        <a className="enlaceinf uppercase">
                                          {res.name}
                                        </a>
                                      </Link>
                                    </button>
                                  );
                                }
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
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
          font-family: ${options?.fuente_global};
          color: ${options?.color_texto_header};
          font-size: 2em;
          font-weight: bold;
          background-position: 0% 100%;
          background-repeat: no-repeat;
          background-size: 0% 2px;
          transition: background-size 0.3s;
          text-transform: uppercase;
        }
        .enlaceBot {
          font-family: ${options?.fuente_global};
          color: ${options?.color_texto_header};
          font-size: 1.1em;
          text-transform: uppercase;
        }
        .enlaceinf {
          font-family: ${options?.fuente_global};
          color: ${options?.color_texto_header};
          font-size: 1.1em;
          text-transform: uppercase;
        }
        a:hover {
          color: ${options?.color_texto_header_hover};
          background-size: 100% 2px;
        }
        .overlay {
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 2;
        }
        .promoTitle {
          font-family: ${options?.fuente_global};
          color: white;
          font-size: 2em;
          z-index: 3;
          padding-left: 20px;
        }
        .buyNow {
          font-family: ${options?.fuente_global};
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
