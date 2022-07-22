import axios from "axios";
import Image from "next/image";
import { useOptions } from "../hooks/useOptions";
import FormularioContacto from "../components/FormularioContacto";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WooCommerce from "../woocommerce/Woocommerce";
import { DefaultSeo } from "next-seo";
const Contacto = ({ opciones, pagina, categoriasAll }) => {
  const { isLoading, options: optionsSWR } = useOptions(opciones);

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
      <Nav categorias={categoriasAll} opciones={optionsSWR} />
      <div
        style={{ color: "white" }}
        className="flex  flex-row w-full  alto items-end justify-center"
      >
        <div className="flex flex-col justify-center w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="p-9 z-[10] flex flex-col justify-center items-center">
                <span className="z-[10] uppercase text-center titulo ">
                  {pagina.titulo_contacto}
                </span>
                <p className="uppercase parrafoPrimera max-w-[350px] text-center">
                  {pagina.parrafo_contacto}
                </p>
              </div>

              <Image
                objectFit="cover"
                src={pagina.fondo_contacto}
                layout="fill"
                priority="high"
                quality={100}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center my-[100px]">
        <div className="flex flex-col w-full max-w-[1000px]">
          <FormularioContacto options={optionsSWR} />
        </div>
      </div>
      <Footer options={optionsSWR}></Footer>
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
          font-family: ${opciones.fuente_titulos};
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
          max-height: 600px;
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
    </>
  );
};
export default Contacto;

export async function getStaticProps() {
  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "Contacto"
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const categoriasAll = await WooCommerce.get(
    "products/categories?order=desc"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      opciones: options.data[0],
      pagina: home2,
      categoriasAll,
    },
    revalidate: 10,
  };
}
