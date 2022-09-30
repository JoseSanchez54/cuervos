import dynamic from "next/dynamic";
const Nav = dynamic(() => import("./Nav"));
const Image = dynamic(() => import("next/image"));
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
const Grid = dynamic(() => import("./Grid"));
const Footer = dynamic(() => import("./Footer"));
const CatSlider = dynamic(() => import("./CatSlider"));
const SecSlider = dynamic(() => import("./SecSlider"));
import { DefaultSeo } from "next-seo";
import { BsArrowRightCircleFill } from "react-icons/bs";
import useMobile from "../hooks/useMobile";
const HomePrintly = ({ opciones, pagina, categorias, ofertas, sectores }) => {
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
  const destacados = Object?.values(pagina?.destacados).map((key) => {
    return key;
  });
  const spanMotion = {
    initial: {
      fontFamily: opciones?.fuente_global,
      fontSize: "20px",
      color: "#35233C",
      display: "flex",
      gap: "5px",
    },
    hover: {
      color: "#ffffff",
    },
  };
  const divMotion = {
    initial: {
      backgroundColor: "#F0F0F0",
      borderRadius: "15px",
    },
    hover: {
      backgroundColor: "#F7546C",
    },
  };
  const divMotion2 = {
    initial: {
      x: 0,
      width: "fit-content",
    },
    hover: {
      x: 7,
    },
  };
  const IconoFlecha = motion(BsArrowRightCircleFill);
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
      <div className="flex flex-row w-full h-full justify-center">
        <div className="flex flex-col w-full h-full items-center p-3 max-w-[1200px]">
          <div className="flex lg:mt-[150px]  lg:flex-nowrap flex-wrap flex-row w-full justify-center">
            <div className="flex flex-col w-full items-start justify-center lg:w-1/2">
              <h1
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "40px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  maxWidth: "420px",
                }}
              >
                {pagina?.titulo}
              </h1>
            </div>
            <div className="flex flex-col w-full items-end my-[15px] justify-center lg:w-1/2">
              <p
                dangerouslySetInnerHTML={{ __html: pagina?.parrafo }}
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "1.1",
                }}
              ></p>
            </div>
          </div>
          <div
            style={{ borderRadius: "15px" }}
            className="flex flex-row w-full lg:flex-nowrap flex-wrap gap-5 lg:mt-[100px] min-h-[424px] justify-center"
          >
            {destacados?.map((e, index) => {
              if (e?.novedad?.si === "true") {
                return (
                  <div
                    key={index}
                    className="flex relative flex-col h-full min-h-[424px] items-between   w-full lg:w-2/4 p-6"
                  >
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-col h-full justify-between min-h-[390px] items-between z-50">
                        <div className="flex flex-col z-50">
                          <span
                            style={{
                              fontFamily: opciones.fuente_global,
                              fontSize: "14px",
                              color: "#fff",
                              textTransform: "uppercase",
                            }}
                          >
                            {e?.pre_titulo}
                          </span>
                          <span
                            className="my-3"
                            style={{
                              fontFamily: opciones.fuente_global,
                              fontSize: "24px",
                              color: "#fff",
                              fontWeight: "bold",
                              maxWidth: "280px",
                            }}
                          >
                            {e?.titulo}
                          </span>
                          <span
                            style={{
                              fontFamily: opciones.fuente_global,
                              fontSize: "14px",
                              color: "#fff",
                              maxWidth: "210px",
                            }}
                          >
                            {e?.parrafo}
                          </span>
                        </div>
                        <motion.div
                          initial={{
                            x: 0,
                            width: "fit-content",
                          }}
                          whileHover={{
                            x: 7,
                          }}
                          className="z-29 w-fit-content"
                        >
                          <Link href={e?.enlace} passHref>
                            <motion.a
                              initial={{
                                x: 0,
                                width: "fit-content",
                              }}
                              whileHover={{
                                x: 100,
                              }}
                            >
                              <BsArrowRightCircleFill
                                color="white"
                                size="30px"
                              />
                            </motion.a>
                          </Link>
                        </motion.div>
                      </div>
                      <div
                        className="flex flex-row justify-center items-center"
                        style={{
                          fontFamily: opciones.fuente_global,
                          fontSize: "14px",
                          color: "#fff",
                          backgroundColor: "#F7546C",
                          zIndex: "29",
                          height: "30px",
                          borderRadius: "20px",
                          padding: "0px 20px",
                        }}
                      >
                        ¡Novedad!
                      </div>
                    </div>

                    <Image
                      style={{ borderRadius: "15px" }}
                      objectFit="cover"
                      layout="fill"
                      src={e.imagen}
                      quality={100}
                    ></Image>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="flex relative flex-col min-h-[424px]  h-full w-full lg:w-1/4 p-6"
                  >
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-col h-full justify-between min-h-[390px] items-between z-50">
                        <div className="flex flex-col z-50">
                          <span
                            style={{
                              fontFamily: opciones.fuente_global,
                              fontSize: "14px",
                              color: "#fff",
                              textTransform: "uppercase",
                            }}
                          >
                            {e?.pre_titulo}
                          </span>
                          <span
                            className="my-3"
                            style={{
                              fontFamily: opciones.fuente_global,
                              fontSize: "24px",
                              color: "#fff",
                              fontWeight: "bold",
                              maxWidth: "280px",
                            }}
                          >
                            {e?.titulo}
                          </span>
                          <span
                            style={{
                              fontFamily: opciones.fuente_global,
                              fontSize: "14px",
                              color: "#fff",
                              maxWidth: "210px",
                            }}
                          >
                            {e?.parrafo}
                          </span>
                        </div>
                        <motion.div
                          initial={{
                            width: "fit-content",
                            x: 0,
                          }}
                          whileHover={{
                            x: 7,
                          }}
                          className="z-29 w-fit-content"
                        >
                          <Link href={e?.enlace} passHref>
                            <motion.a>
                              <BsArrowRightCircleFill
                                color="white"
                                size="30px"
                              />
                            </motion.a>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                    <Image
                      style={{ borderRadius: "15px" }}
                      objectFit="cover"
                      layout="fill"
                      src={e.imagen}
                      quality={100}
                    ></Image>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex lg:my-[100px] my-[20px]  lg:flex-nowrap flex-wrap flex-row w-full justify-center">
            <div className="flex flex-col w-full items-center lg:items-start justify-center lg:w-1/2">
              <h1
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "22px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  maxWidth: "284px",
                }}
                className="text-center lg:text-left"
              >
                Más de 500 productos para Todo tipo de empresas
              </h1>
            </div>
            <div className="flex flex-col w-full items-center lg:items-end my-[15px]  justify-center lg:w-1/2">
              <Link href="/tienda">
                <a>
                  <motion.button
                    initial={{
                      fontFamily: opciones?.fuente_global,
                      color: "#ffffff",
                      backgroundColor: "#F7546C",
                      border: "1px solid #F7546C",
                      padding: "5px 25px",
                      borderRadius: "20px",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    whileHover={{
                      fontFamily: opciones?.fuente_global,
                      color: "#F7546C",
                      backgroundColor: "transparent",
                      border: "1px solid #F7546C",
                      fontSize: "15px",
                    }}
                  >
                    Ver todos los<br></br> productos
                  </motion.button>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex flex-row lg:flex-wrap   gap-3  w-full justify-center">
            {isMobile ? (
              <div className="contents">
                <CatSlider categorias={categorias} opciones={opciones} />
              </div>
            ) : (
              categorias?.map((e, index) => {
                return (
                  <>
                    {e.slug !== "destacados" && e.slug !== "todos" && (
                      <>
                        <AnimatePresence>
                          <motion.div
                            key={index}
                            variants={divMotion}
                            initial="initial"
                            whileHover="hover"
                            className="flex flex-col items-end justify-end relative p-5 lg:max-w-[270px] min-h-[133px]  lg:w-1/4 w-1/2"
                          >
                            <motion.div
                              variants={divMotion2}
                              className="z-[29]"
                            >
                              <Link href={"/categorias/" + e?.slug} passHref>
                                <a>
                                  <motion.span variants={spanMotion}>
                                    {e?.name}
                                    <IconoFlecha />
                                  </motion.span>
                                </a>
                              </Link>
                            </motion.div>

                            {e?.image?.src && (
                              <Image
                                objectFit="contain"
                                objectPosition="left"
                                layout="fill"
                                src={e?.image?.src}
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </>
                    )}
                  </>
                );
              })
            )}
          </div>
          <div className="flex flex-row gap-5 lg:mt-[150px] mt-5 w-full justify-center">
            <div className="flex flex-col w-full">
              {" "}
              <span
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                Ofertas del mes
              </span>
              <p
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "18px",
                }}
              >
                Descubre los productos en oferta este mes. ¡No te los pierdas!
              </p>
            </div>
          </div>
          <div className="flex flex-row flex-wrap lg:flex-nowrap gap-5 my-[50px] w-full justify-center">
            <Grid productos={ofertas} opciones={opciones} max={5} />
          </div>
          <div className="flex lg:my-[30px] my-[20px]  lg:flex-nowrap flex-wrap flex-row w-full justify-center">
            <div className="flex flex-col w-full items-center lg:items-start justify-center lg:w-1/2">
              <span
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "40px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  maxWidth: "580px",
                }}
                className="text-center lg:text-left"
              >
                Mira todo lo que podemos hacer por tu negocio
              </span>
              <p
                style={{
                  fontFamily: opciones.fuente_global,
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  maxWidth: "500px",
                }}
                className="text-center lg:text-left mt-3"
              >
                Tenemos productos de impresión y material corporativo para todo
                tipo de empresas.
              </p>
            </div>
            <div className="flex flex-col w-full items-center lg:items-end my-[30px]  justify-center lg:w-1/2">
              <Link href="/tienda">
                <a>
                  <motion.button
                    initial={{
                      fontFamily: opciones?.fuente_global,
                      color: "#ffffff",
                      backgroundColor: "#F7546C",
                      border: "1px solid #F7546C",
                      padding: "5px 25px",
                      borderRadius: "20px",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    whileHover={{
                      fontFamily: opciones?.fuente_global,
                      color: "#F7546C",
                      backgroundColor: "transparent",
                      border: "1px solid #F7546C",
                      fontSize: "15px",
                    }}
                  >
                    Ver todos los<br></br> Sectores
                  </motion.button>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-3 w-full justify-center">
            <>
              {isMobile ? (
                <SecSlider opciones={opciones} sectores={sectores} />
              ) : (
                <>
                  {sectores.map((sec, index) => {
                    return (
                      <AnimatePresence>
                        <Link
                          key={index}
                          passHref
                          href={"/sectores/" + sec?.slug}
                        >
                          <a className="min-h-[126px] max-w-[285px] justify-end items-end w-1/4">
                            <motion.div
                              initial="initial"
                              whileHover="hover"
                              className="flex flex-col relative p-5 min-h-[126px] max-w-[285px] justify-end items-end"
                            >
                              <motion.span
                                variants={divMotion2}
                                className="z-[20] flex gap-1"
                                style={{
                                  fontFamily: opciones.fuente_global,
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                  color: "#ffffff",
                                  textTransform: "capitalize",
                                }}
                              >
                                {sec?.meta.nombre} <IconoFlecha />
                              </motion.span>
                              <Image
                                objectFit="cover"
                                layout="fill"
                                src={sec?.meta?.imagen}
                              />
                            </motion.div>
                          </a>
                        </Link>
                      </AnimatePresence>
                    );
                  })}
                </>
              )}
            </>
          </div>
        </div>
      </div>

      <Footer options={opciones}></Footer>

      <style jsx>{``}</style>
    </>
  );
};
export default HomePrintly;
