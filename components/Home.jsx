import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/Nav"));
const Image = dynamic(() => import("next/image"));
import { motion } from "framer-motion";
import Link from "next/link";
const Grid = dynamic(() => import("../components/Grid"));
const Footer = dynamic(() => import("../components/Footer"));
import { DefaultSeo } from "next-seo";
import { AiOutlineArrowRight } from "react-icons/ai";
import useMobile from "../hooks/useMobile";
const HomeCuervos = ({ opciones, pagina, categorias, vinos }) => {
  const { isMobile } = useMobile();
  const variablesBoton = {
    initial: {
      display: "flex",
      color: "#000",
      fontFamily: opciones.fuente_global,
      fontSize: "16px",
    },
  };
  const variablesIcono = {
    initial: { marginLeft: "0px" },
    hover: { marginLeft: "10px" },
  };
  return (
    <>
      <DefaultSeo
        title={pagina.titulo_pagina}
        description={pagina.descripcion_de_pagina}
        canonical={process.env.URLFINAL}
        additionalLinkTags={[
          {
            rel: "icon",
            href: opciones.favicon_principal,
          },
        ]}
        openGraph={{
          type: "website",
          locale: "en_ES",
          url: process.env.URLFINAL,
          site_name: opciones.nombre_sitio,
          description: opciones.descripcion_sitio,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Nav categorias={categorias} opciones={opciones} />
      <div className="flex flex-row w-full  alto items-end justify-center">
        <div className="flex flex-col justify-end w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex flex-col lg:justify-end justify-start items-center lg:items-start w-full h-full">
              <div className="p-9 z-[10]">
                <span className="z-[10] uppercase w-full text-center lg:text-left block titulo lg:ml-[40px]">
                  {pagina.titulo}
                </span>
              </div>

              <Image
                objectFit="cover"
                src={pagina.primera_imagen}
                layout="fill"
                priority="high"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center mt-[50px] lg:mt-[100px]">
        <div className="flex flex-col w-full h-full max-w-[1212px]">
          <div className="flex flex-row flex-wrap lg:min-h-[1016px]  w-full lg:h-[1016px]">
            <div className="flex flex-col h-full w-full lg:w-2/3">
              <div className="relative w-full h-full">
                <div className="flex flex-col items-center w-full h-full">
                  <div className="p-9 lg:text-center z-[10]">
                    <span
                      style={{
                        fontSize: "55px",
                      }}
                      className="tituloPrimera uppercase z-[10]"
                    >
                      {pagina.segunda_primer_titulo}
                    </span>
                    <p>{pagina.segunda_primer_parrafo}</p>
                    {isMobile && (
                      <Link href={pagina.primer_enlace}>
                        <motion.button
                          initial={{
                            border: "2px solid black",
                            color: "black",
                            backgroundColor: "transparent",
                            zIndex: "10",
                            padding: "20px 20px",
                            marginTop: "25px",
                            fontSize: "14px",
                            fontFamily: opciones.fuente_titulos,
                            textTransform: "uppercase",
                          }}
                          whileHover={{
                            backgroundColor: "black",
                            color: "black",
                          }}
                        >
                          Encuentra tu Nuevo vino favorito
                        </motion.button>
                      </Link>
                    )}
                  </div>
                  {pagina.segunda_primera_imagen_fondo && (
                    <Image
                      objectFit="cover"
                      layout="fill"
                      src={pagina.segunda_primera_imagen_fondo}
                    ></Image>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{ color: "white" }}
              className="flex flex-col min-h-[500px] lg:w-1/3 w-full h-full"
            >
              <div className="flex flex-col  h-full w-full">
                <div className="flex flex-row h-1/2">
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-end lg:justify-start w-full h-full">
                      <div className="p-9 lg:text-center z-[10]">
                        <span
                          style={{
                            fontSize: "40px",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_segundo_titulo}
                        </span>
                        <p>{pagina.segunda_segundo_parrafo}</p>
                        {isMobile && (
                          <Link href={pagina.segundo_enlace}>
                            <motion.button
                              initial={{
                                border: "2px solid white",
                                color: "white",
                                backgroundColor: "transparent",
                                zIndex: "10",
                                padding: "20px 20px",
                                marginTop: "25px",
                                fontSize: "14px",
                                fontFamily: opciones.fuente_titulos,
                                textTransform: "uppercase",
                              }}
                              whileHover={{
                                backgroundColor: "white",
                                color: "black",
                              }}
                            >
                              Encuentra tu Nuevo vino favorito
                            </motion.button>
                          </Link>
                        )}
                      </div>
                      {pagina.segunda_segunda_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_segunda_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row h-1/2">
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_tercer_titulo}
                        </span>
                        <p>{pagina.segunda_tercer_parrafo}</p>
                      </div>
                      {pagina.segunda_tercera_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_tercera_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row  w-full justify-center">
        <div className="flex flex-col w-full h-full max-w-[1212px]">
          <div className="flex flex-row h-[508px] flex-wrap  w-full">
            <div className="flex flex-col w-full lg:w-2/3">
              <div className="flex flex-row min-h-[500px] lg:min-h-[508px] h-full w-full">
                <div
                  style={{ color: "black" }}
                  className="flex flex-col h-full w-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col lg:items-end items-center justify-start w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                            maxWidth: "260px",
                            display: "block",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_cuarto_titulo}
                        </span>
                        <p>{pagina.segunda_cuarto_parrafo}</p>
                      </div>
                      {pagina.segunda_cuarta_imagen_fondo_ && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_cuarta_imagen_fondo_}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] h-full w-full">
                <div
                  style={{ color: "white" }}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-start w-full h-full">
                      <div className="p-9 text-center h-full z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_quinto_titulo}
                        </span>
                        <Link href={pagina.quinto_enlace}>
                          <motion.button
                            initial={{
                              border: "2px solid white",
                              color: "white",
                              backgroundColor: "transparent",
                              zIndex: "10",
                              padding: "20px 20px",
                              marginTop: "25px",
                              fontSize: "14px",
                              fontFamily: opciones.fuente_titulos,
                              textTransform: "uppercase",
                            }}
                            whileHover={{
                              backgroundColor: "white",
                              color: "black",
                            }}
                          >
                            Encuentra tu Nuevo lugar favorito
                          </motion.button>
                        </Link>
                      </div>
                      {pagina.segunda_quinta_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_quinta_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row  w-full justify-center">
        <div className="flex flex-col w-full h-full max-w-[1212px]">
          <div className="lg:flex hidden flex-row flex-wrap h-[508px]  w-full">
            <div className="flex flex-col w-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] lg:min-h-[508px] h-full w-full">
                <div
                  style={{ color: "black" }}
                  className="flex flex-col h-full w-full"
                >
                  <div className="relative bg-[#F9F8F4] w-full h-full">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                            maxWidth: "260px",
                            display: "block",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_sexta_titulo}
                        </span>
                        <p>{pagina.segunda_sexto_parrafo}</p>
                      </div>
                      {pagina.segunda_sexta_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_sexta_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] h-full w-full">
                <div
                  style={{ color: "white" }}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-start w-full h-full">
                      <div className="p-9 text-center h-full z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_septima_titulo}
                        </span>
                      </div>
                      {pagina.segunda_septima_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_septima_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] h-full w-full">
                <div
                  style={{ color: "white" }}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="p-9 text-center  z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera uppercase z-[10]"
                        >
                          {pagina.segunda_octava_titulo}
                        </span>
                      </div>
                      {pagina.segunda_octava_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_octava_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center mt-[40px] lg:mt-[100px]">
        <div className="flex flex-col w-full h-full max-w-[1200px]">
          <div className="flex flex-row w-full">
            <span className="tituloseccion ml-3 uppercase">Elige tu vino</span>
          </div>
          <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center w-full min-h-[508px] h-full">
            <Grid max="3" productos={vinos} opciones={opciones} />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full max-h-[63px] justify-center mt-[40px] lg:mt-[100px]">
        <div className="flex flex-col w-full max-w-[1200px]">
          <div className="flex flex-row justify-center w-full">
            <Link href="/categoria/todos">
              <a>
                <motion.button
                  variants={variablesBoton}
                  initial="initial"
                  whileHover="hover"
                  className="flex flex-row gap-2 items-center"
                >
                  TODOS NUESTROS PRODUCTOS{" "}
                  <motion.div variants={variablesIcono}>
                    <AiOutlineArrowRight />
                  </motion.div>
                </motion.button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center mt-[40px] lg:mt-[100px]">
        <div className="flex flex-col w-full max-w-[1200px]">
          <div className="flex flex-row min-h-[339px] my-9 w-full bg-black">
            <div className="flex flex-col justify-center p-5 w-full lg:w-1/3">
              {" "}
              <Image
                width="300"
                height="100"
                objectFit="contain"
                src={pagina.titulo_banner}
              ></Image>
              <p
                className="lg:ml-[40px]"
                style={{
                  color: "white",
                  fontFamily: opciones.fuente_global,
                  fontSize: "14px",
                }}
              >
                {pagina.parrafo_banner}
              </p>
            </div>
            <div className="lg:flex hidden flex-col w-2/3">
              <div className="relative w-full h-full">
                <Image
                  objectFit="cover"
                  layout="fill"
                  src={pagina.imagen_fondo_banner}
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-5 w-full justify-center mt-[40px] lg:mt-[100px]">
        <div className="flex flex-col w-full max-w-[1200px]">
          <span
            style={{
              fontFamily: opciones.fuente_titulos,
              fontSize: "36px",
              textTransform: "uppercase",
            }}
          >
            ¡AQUí y ahora!
          </span>
          <p
            style={{
              fontFamily: opciones.fuente_global,
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            ESOS MOMENTOS QUE nos hacen ser diferentes
          </p>
        </div>
      </div>
      <Footer options={opciones}></Footer>

      <style jsx>{`
        .titulo {
          font-family: ${opciones.fuente_titulos};
          font-size: 120px;
          line-height: 1.1;
        }
        .tituloPrimera {
          font-family: ${opciones.fuente_titulos};
          line-height: 1.1;
        }
        .parrafoPrimera {
          font-family: ${opciones.fuente_global};
          line-height: 1.1;
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
        }
        .tituloseccion {
          font-family: ${opciones.fuente_titulos};
          font-size: 36px;
          line-height: 1.1;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones.fuente_titulos};
            font-size: 90px;
            line-height: 1.1;
          }
          .flex-col {
            min-height: 500px;
          }
        }
        @media (max-width: 768px) {
          .titulo {
            font-family: ${opciones.fuente_titulos};
            font-size: 55px;
            line-height: 1.1;
          }
          .flex-col {
            min-height: 500px;
          }
        }
      `}</style>
    </>
  );
};
export default HomeCuervos;
