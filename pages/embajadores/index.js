import dynamic from "next/dynamic";
const DefaultSeo = dynamic(() =>
  import("next-seo").then((mod) => mod.DefaultSeo)
);
import axios from "axios";
import Link from "next/link";
import WooCommerce from "../../woocommerce/Woocommerce";
import { usePages } from "../../hooks/usePages";
import { useEmbajador } from "../../hooks/useEmbajador";
import { motion } from "framer-motion";
const Nav = dynamic(() => import("../../components/Nav"));
const Footer = dynamic(() => import("../../components/Footer"));
const Edad = dynamic(() => import("../../components/Edad"));
const Image = dynamic(() => import("next/image"));
const Embajadores = ({ options, pagesNew, categorias, embajadores }) => {
  const { data } = usePages(pagesNew, "embajadores");
  const { embajadores: embajadoresUpdate } = useEmbajador(embajadores);

  return (
    <>
      <DefaultSeo
        title={"Cría Cuervos - " + data?.titulo_pagina}
        description={data?.descripcion_de_pagina}
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
      <Nav categorias={categorias} opciones={options} />
      <div
        style={{ color: "white" }}
        className="flex  flex-row w-full  alto items-end justify-center"
      >
        <div className="flex flex-col justify-start w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="p-9 z-[10] flex flex-col justify-center items-center">
                <span className="z-[10] uppercase text-center tituloPrimera ">
                  ¡AQUI Y AHORA!
                </span>
                <h1>
                  <span className="z-[10] uppercase text-center titulo ">
                    {data?.titulo}
                  </span>
                </h1>
              </div>
              {data?.primera_imagen && (
                <Image
                  objectFit="cover"
                  src={data?.primera_imagen}
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
          <div className="flex flex-row w-full flex-wrap justify-center">
            {embajadoresUpdate &&
              embajadoresUpdate?.map((e, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex flex-col p-5 lg:p-9 min-h-[660px] relative w-full lg:w-1/2 h-full justify-start items-start"
                    >
                      {e?.principal_foto && (
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={e?.principal_foto}
                        ></Image>
                      )}
                      <div
                        style={{
                          backgroundColor: "rgba(0,0,0,0.3)",
                        }}
                        className="w-full h-full absolute top-0 right-0 left-0 bottom-0 overlay "
                      ></div>

                      <div className="flex flex-row w-full z-[50]">
                        <div className="flex flex-col items-start w-full">
                          <span
                            style={{
                              fontSize: "57px",
                              color: "white",
                            }}
                            className="titulo"
                          >
                            {e?.nombre}
                          </span>
                          <Link passHref href={"/embajadores/" + e?.slug}>
                            <a>
                              <motion.button
                                className="mt-5"
                                initial={{
                                  backgroundColor: "transparent",
                                  color: "white",
                                  padding: "10px 20px",
                                  border: "2px solid white",
                                  fontFamily: options?.fuente_global,
                                }}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{
                                  backgroundColor: "white",
                                  color: "black",
                                  padding: "10px 20px",
                                  border: "2px solid white",
                                }}
                              >
                                Explore
                              </motion.button>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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
export default Embajadores;
export async function getStaticProps(props) {
  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "embajadores"
  );
  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const embajadores = await axios
    .get(
      process.env.URLBASE +
        "/wp-json/jet-cct/embajadores/?_orderby=_ID&_order=asc&_ordertype=integer"
    )
    .then((res) => res.data);
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      options: options.data[0],
      pagesNew: home2,
      categorias,
      embajadores,
    },
    revalidate: 10,
  };
}
