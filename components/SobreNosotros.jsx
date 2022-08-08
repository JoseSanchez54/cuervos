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
        title={pagina.titulo_pagina}
        description={pagina.descripcion_de_pagina}
        canonical={process.env.URLFINAL + "/sobre-nosotros"}
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
      <div
        style={{ color: "white" }}
        className="flex  flex-row w-full  alto items-end justify-center"
      >
        <div className="flex flex-col justify-center w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="p-9 z-[10] flex flex-col justify-center items-center">
                <span className="z-[10] uppercase text-center tituloPrimera ">
                  {pagina.pretitulo_nosotros}
                </span>
                <span className="z-[10] uppercase text-center titulo ">
                  {pagina.titulo_nosotros}
                </span>
                <p className="uppercase parrafoPrimera max-w-[350px] text-center">
                  {pagina.parrafo_nosotros}
                </p>
              </div>

              <Image
                objectFit="cover"
                src={pagina.primera_imagen_nosotros}
                layout="fill"
                priority="high"
                quality={100}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ color: "black" }}
        className="flex flex-row p-5 w-full justify-center mt-[50px] lg:mt-[100px]"
      >
        <div className="flex flex-col w-full  max-w-[1212px]">
          <div className="flex flex-row flex-wrap  my-[50px] w-full ">
            <div className="flex flex-col items-center w-full">
              <span className="z-[10] uppercase text-center tituloPrimera ">
                {pagina.segunda_primer_titulo_nosotros}
              </span>
              <p className="uppercase parrafoPrimera mt-[20px]  max-w-[350px] text-center">
                {pagina.segunda_primer_parrafo_nosotros}
              </p>
            </div>
          </div>
          <div className="flex gap-9 flex-row my-[50px] flex-wrap lg:flex-nowrap w-full justify-center">
            <div className="flex flex-col lg:w-1/2 w-full">
              <Image
                width="658px"
                height="747px"
                src={pagina.imagen_tercera_nosotros}
              />
            </div>
            <div className="flex flex-col lg:w-1/2 w-full justify-center">
              <span className="z-[10] uppercase text-center mb-9 tituloPrimera ">
                {pagina.titulo_tercera_nosotros}
              </span>
              <p className="uppercase parrafoPrimera  text-center">
                {pagina.parrafo_tercera_nosotros}
              </p>
            </div>
          </div>
          <div className="flex gap-9 flex-row my-[50px] lg:flex-nowrap w-full justify-center flex-wrap-reverse">
            <div className="flex flex-col lg:w-1/2 w-full justify-center">
              <span className="z-[10] uppercase text-center mb-9 tituloPrimera ">
                {pagina.titulo_cuarta_nosotros}
              </span>
              <p className="uppercase parrafoPrimera  text-center">
                {pagina.parrafo_cuarta_nosotros}
              </p>
            </div>
            <div className="flex flex-col lg:w-1/2 w-full">
              <Image
                width="658px"
                height="747px"
                src={pagina.imagen_cuarta_nosotros}
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-center">
            <div className="relative w-full min-h-[587px]">
              <Image layout="fill" src={pagina.imagen_quinta_nosotros} />
            </div>
          </div>
          <div className="flex gap-9 flex-row my-[50px] flex-wrap-reverse lg:flex-nowrap w-full justify-center">
            <div className="flex flex-col lg:w-1/2 w-full">
              <Image
                width="658px"
                height="747px"
                src={pagina.imagen_sexta_nosotros}
              />
            </div>
            <div className="flex flex-col lg:w-1/2 w-full justify-center">
              <span className="z-[10] uppercase text-center mb-9 tituloPrimera ">
                {pagina.titulo_sexta_nosotros}
              </span>
              <p className="uppercase parrafoPrimera  text-center">
                {pagina.parrafo_sexta_nosotros}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer options={opciones}></Footer>
      <style jsx>{`
        .titulo {
          font-family: ${opciones.fuente_titulos};
          font-size: 120px;
        }
        .tituloPrimera {
          font-family: ${opciones.fuente_titulos};
          font-size: 38px;
        }
        .parrafoPrimera {
          font-family: ${opciones.fuente_global};
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
        }
        .tituloseccion {
          font-family: ${opciones.fuente_titulos};
          font-size: 36px;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones.fuente_titulos};
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
