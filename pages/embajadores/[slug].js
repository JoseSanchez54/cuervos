import dynamic from "next/dynamic";
const DefaultSeo = dynamic(() =>
  import("next-seo").then((mod) => mod.DefaultSeo)
);
import axios from "axios";
import Link from "next/link";
import WooCommerce from "../../woocommerce/Woocommerce";
import { useEmbajador } from "../../hooks/useEmbajador";
import { motion } from "framer-motion";
const Nav = dynamic(() => import("../../components/Nav"));
import quitarAcentos from "../../utils/quitarAcentos";
const Footer = dynamic(() => import("../../components/Footer"));
const Edad = dynamic(() => import("../../components/Edad"));
const Image = dynamic(() => import("next/image"));
export const getStaticPaths = async () => {
  const embajadores = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/embajadores")
    .then((res) => res.data);

  const paths = embajadores.map((produ) => {
    return {
      params: {
        slug: produ.slug,
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};
export async function getStaticProps(context) {
  const slug = context.params.slug;

  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "embajadores"
  );
  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );

  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  const embajadores = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/embajadores")
    .then((res) => res.data);
  const embajador = await embajadores.find(
    (embajador) => slug === embajador.slug
  );

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      categorias,
      embajador,
    },
    revalidate: 100,
  };
}
const Embajador = ({ embajador, options, categorias }) => {
  return (
    <>
      {
        <DefaultSeo
          title={"Cría Cuervos - " + embajador?.nombre}
          description={embajador?.informacion}
          canonical={process.env.URLFINAL}
          additionalLinkTags={[
            {
              rel: "icon",
              href: options.favicon_principal,
            },
          ]}
          openGraph={{
            type: "website",
            locale: "en_ES",
            url: process.env.URLFINAL,
            site_name: options.nombre_sitio,
            description: options.descripcion_sitio,
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
      }
      <Nav categorias={categorias} opciones={options} />
      <div
        style={{ color: "white" }}
        className="flex  flex-row w-full  alto items-end justify-center"
      >
        <div className="flex flex-col justify-start w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="p-9 z-[10] flex flex-col justify-center items-center">
                <h1>
                  <span className="z-[10] uppercase text-center titulo ">
                    {embajador?.nombre}
                  </span>
                </h1>
              </div>
              {embajador?.principal_foto && (
                <Image
                  objectFit="cover"
                  src={embajador?.principal_foto}
                  layout="fill"
                  priority="high"
                  quality={100}
                ></Image>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full  justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-[1212px]">
          <div className="flex py-9 px-5 flex-row w-full flex-wrap justify-center">
            <div className="flex flex-col w-full">
              <span
                style={{
                  color: "black",
                }}
                className="titulo"
              >
                {embajador?.puesto}
              </span>
              <p
                className="mt-5"
                dangerouslySetInnerHTML={{ __html: embajador?.informacion }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full  justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-[1212px]">
          <div className="flex flex-row w-full flex-wrap justify-center">
            <>
              <div className="flex flex-col p-9 bg-black lg:p-9 min-h-[660px] justify-center relative w-full lg:w-1/2 h-full  items-start">
                <span
                  style={{
                    color: "white",
                    fontSize: "79px",
                    fontFamily: options?.fuente_titulos,
                  }}
                >
                  {embajador?.frase}
                </span>
                <div className="flex flex-row w-full justify-end items-end">
                  <span style={{ fontSize: "20px", color: "white" }}>
                    {embajador?.nombre}
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-5 lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.principal_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.principal_foto}
                  ></Image>
                )}
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                  className="w-full h-full absolute top-0 right-0 left-0 bottom-0 overlay "
                ></div>
              </div>
            </>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full  justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-[1212px]">
          <div className="flex flex-row w-full flex-wrap justify-center">
            <>
              <div className="flex flex-col p-5 bg-black lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.segunda_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.segunda_foto}
                  ></Image>
                )}
              </div>
              <div className="flex flex-col p-5 lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.tercera_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.tercera_foto}
                  ></Image>
                )}
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                  className="w-full h-full absolute top-0 right-0 left-0 bottom-0 overlay "
                ></div>
              </div>
            </>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full  justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-[1212px]">
          <div className="flex flex-row w-full flex-wrap justify-center">
            <>
              <div className="flex flex-col p-5 bg-black lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.cuarta_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.cuarta_foto}
                  ></Image>
                )}
              </div>
              <div className="flex flex-col p-5 lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.quinta_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.quinta_foto}
                  ></Image>
                )}
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                  className="w-full h-full absolute top-0 right-0 left-0 bottom-0 overlay "
                ></div>
              </div>
            </>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full  justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full max-w-[1212px]">
          <div className="flex flex-row w-full flex-wrap justify-center">
            <>
              <div className="flex flex-col p-5 bg-black lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.sexta_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.sexta_foto}
                  ></Image>
                )}
              </div>
              <div className="flex flex-col p-5 lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start">
                {embajador?.septima_foto && (
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={embajador?.septima_foto}
                  ></Image>
                )}
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                  className="w-full h-full absolute top-0 right-0 left-0 bottom-0 overlay "
                ></div>
              </div>
            </>
          </div>
        </div>
      </div>
      <Footer options={options}></Footer>
      <style jsx>{`
        .titulo {
          font-family: ${options?.fuente_titulos};
          font-size: 120px;
        }
        .tituloPrimera {
          font-family: ${options?.fuente_titulos};
          font-size: 38px;
        }
        .parrafoPrimera {
          font-family: ${options?.fuente_global};
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
        }
        .tituloseccion {
          font-family: ${options?.fuente_titulos};
          font-size: 36px;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${options?.fuente_titulos};
            font-size: 90px;
            line-height: 1.1;
          }
        }
      `}</style>
      <Edad options={options} />
    </>
  );
};
export default Embajador;
