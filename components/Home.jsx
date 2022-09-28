import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/Nav"));
const Image = dynamic(() => import("next/image"));
import { motion } from "framer-motion";
import Link from "next/link";
const Grid = dynamic(() => import("../components/Grid"));
const Footer = dynamic(() => import("../components/Footer"));
import { DefaultSeo } from "next-seo";
import { BsArrowRightCircleFill } from "react-icons/bs";
import useMobile from "../hooks/useMobile";
import Edad from "./Edad";
const HomePrintly = ({ opciones, pagina, categorias }) => {
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
  console.log(destacados);

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
          <div className="flex lg:mt-[200px]  lg:flex-nowrap flex-wrap flex-row w-full justify-center">
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
                        <div className="z-50">
                          <Link href={e?.enlace} passHref>
                            <motion.a>
                              <BsArrowRightCircleFill
                                color="white"
                                size="30px"
                              />
                            </motion.a>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="flex flex-row justify-center items-center"
                        style={{
                          fontFamily: opciones.fuente_global,
                          fontSize: "14px",
                          color: "#fff",
                          backgroundColor: "#F7546C",
                          zIndex: "50",
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
                        <div className="z-50">
                          <Link href={e?.enlace} passHref>
                            <motion.a>
                              <BsArrowRightCircleFill
                                color="white"
                                size="30px"
                              />
                            </motion.a>
                          </Link>
                        </div>
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
        </div>
      </div>

      <Footer options={opciones}></Footer>

      <style jsx>{``}</style>
      <Edad options={opciones} />
    </>
  );
};
export default HomePrintly;
