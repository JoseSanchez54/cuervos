import axios from "axios";
import Image from "next/image";
import { useOptions } from "../hooks/useOptions";
import FormularioContacto from "../components/FormularioContacto";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WooCommerce from "../woocommerce/Woocommerce";
import Edad from "../components/Edad";
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

      <div className="flex flex-row alto w-full lg:items-center  items-start justify-center">
        <div className="flex flex-col max-w-[1600px] justify-start lg:justify-center w-full items-center">
          <div className="flex flex-row  items-start w-full justify-center">
            <div className="flex flex-col justify-center h-full  lg:justify-start w-full p-7 lg:w-1/3 items-center lg:items-start">
              <span className="z-[10] uppercase text-center lg:text-start titulo ">
                {pagina.titulo_contacto}
              </span>
              <p className="uppercase parrafoPrimera mb-8 max-w-[350px] text-center lg:text-start">
                {pagina.parrafo_contacto}
              </p>
              <FormularioContacto options={optionsSWR} />
            </div>
            <div className="lg:flex hidden flex-col  justify-center w-full p-7 lg:w-2/3 items-center">
              <Image
                objectFit="contain"
                src={pagina.fondo_contacto}
                height="700px"
                width="700px"
                priority="high"
                quality={100}
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <Footer options={optionsSWR}></Footer>
      <style jsx>{`
        .titulo {
          font-family: ${opciones.fuente_titulos};
          font-size: 60px;
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
          min-height: calc(100vh - 309px);
        }
        .tituloseccion {
          font-family: ${opciones.fuente_titulos};
          font-size: 36px;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones.fuente_titulos};
            font-size: 70px;
            line-height: 1.1;
          }
          .alto {
            height: 100vh;
          }
        }
      `}</style>
      <Edad options={opciones} />
    </>
  );
};
export default Contacto;

export async function getStaticProps() {
  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas",
    {
      headers: { "User-Agent": "Axios 0.21.1" },
    }
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "Contacto"
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/",
    {
      headers: { "User-Agent": "Axios 0.21.1" },
    }
  );
  const categoriasAll = await WooCommerce.get(
    "products/categories?order=desc&per_page=100",
    {
      headers: { "User-Agent": "Axios 0.21.1" },
    }
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
