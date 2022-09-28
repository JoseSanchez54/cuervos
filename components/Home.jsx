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
import Edad from "./Edad";
const HomePrintly = ({ opciones, pagina, categorias, vinos }) => {
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
          .flex-col.lt {
            min-height: fit-content;
          }
          .flex-col.min {
            min-height: 790px;
          }
        }
      `}</style>
      <Edad options={opciones} />
    </>
  );
};
export default HomePrintly;
