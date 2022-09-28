import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"));
const Nav = dynamic(() => import("../components/Nav"));
const Image = dynamic(() => import("next/image"));
import Edad from "./Edad";
import { DefaultSeo } from "next-seo";
const SobreNosotros = ({ opciones, pagina, categorias }) => {
  return (
    <>
      <DefaultSeo
        title={pagina?.titulo_pagina}
        description={pagina?.descripcion_de_pagina}
        canonical={process.env.URLFINAL + "/sobre-nosotros"}
        additionalLinkTags={[
          {
            rel: "icon",
            href: opciones?.favicon_principal,
          },
        ]}
        openGraph={{
          type: "website",
          locale: "en_ES",
          url: process.env.URLFINAL,
          site_name: opciones?.nombre_sitio,
          description: opciones?.descripcion_sitio,
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
          font-family: ${opciones?.fuente_titulos};
          font-size: 120px;
        }
        .tituloPrimera {
          font-family: ${opciones?.fuente_titulos};
          font-size: 38px;
        }
        .parrafoPrimera {
          font-family: ${opciones?.fuente_global};
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
        }
        .tituloseccion {
          font-family: ${opciones?.fuente_titulos};
          font-size: 36px;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones?.fuente_titulos};
            font-size: 90px;
            line-height: 1.1;
          }
        }
      `}</style>
      <Edad options={opciones} />
    </>
  );
};
export default SobreNosotros;
