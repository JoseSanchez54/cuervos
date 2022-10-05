import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/Nav"));
const ShopNav = dynamic(() => import("../components/ShopNav"));
const SingleGrid = dynamic(() => import("../components/SingleGrid"));
const Image = dynamic(() => import("next/image"));
const Footer = dynamic(() => import("../components/Footer"));
import Edad from "./Edad";
import { DefaultSeo } from "next-seo";
const Categorias = ({ opciones, pagina, categorias, productos, actual }) => {
  return (
    <>
      <DefaultSeo
        title={pagina?.titulo_pagina + "-" + actual?.name}
        description={pagina?.descripcion_de_pagina}
        canonical={process.env.URLFINAL + "/" + actual?.slug}
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
      <div className="flex flex-row w-full lg:min-h-[76vh] justify-center">
        <div className="flex flex-col w-full items-center  max-w-[1212px] ">
          <div className="flex flex-row p-5 w-full">
            <span className="titulo uppercase">Tienda Online</span>
          </div>
          <div className="lg:flex flex-row p-5 hidden  w-full">
            <ShopNav opciones={opciones} pagina={pagina} />
          </div>

          <div className="flex flex-row flex-wrap justify-center lg:justify-start  w-full">
            {productos?.map((producto, index) => {
              return (
                <>
                  {index === 0 && (
                    <div
                      key={index}
                      className="flex flex-row  flex-wrap lg:flex-nowrap  w-full"
                    >
                      <div className="flex flex-col min-h-[200px] w-full items-center lg:w-2/3">
                        <div className="relative p-3 w-full h-full justify-center items-center flex-col flex">
                          <span className="z-[20] uppercase text-center titulo2">
                            {pagina?.primer_titulo_tienda}
                          </span>

                          {pagina?.banner_tienda && (
                            <Image
                              objectFit="cover"
                              layout="fill"
                              src={pagina?.banner_tienda}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col w-full items-center lg:w-1/3">
                        <SingleGrid opciones={opciones} producto={producto} />
                      </div>
                    </div>
                  )}
                  {index > 0 && index < 7 && (
                    <SingleGrid
                      key={index}
                      opciones={opciones}
                      producto={producto}
                    />
                  )}
                  {index === 6 && (
                    <>
                      {productos[index + 1]?.name && (
                        <div
                          key={index + 1}
                          className="flex flex-row  flex-wrap lg:flex-nowrap  w-full"
                        >
                          <div className="flex flex-col min-h-[200px] w-full items-center lg:w-2/3">
                            <div className="relative p-3 w-full h-full justify-center items-center flex-col flex">
                              <span className="z-[20] uppercase text-center titulo2">
                                {pagina?.segundo_titulo_tienda}
                              </span>

                              {pagina?.banner_tienda_segundo && (
                                <Image
                                  objectFit="cover"
                                  layout="fill"
                                  src={pagina?.banner_tienda_segundo}
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col w-full items-center lg:w-1/3">
                            <SingleGrid
                              opciones={opciones}
                              producto={productos[index + 1]}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {index > 7 && (
                    <SingleGrid
                      key={index}
                      opciones={opciones}
                      producto={producto}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Footer options={opciones}></Footer>
      <style jsx>{`
        .titulo {
          font-family: ${opciones?.fuente_titulos};
          font-size: 36px;
        }
        .titulo2 {
          font-family: ${opciones?.fuente_titulos};
          font-size: 55px;
          color: white;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones?.fuente_titulos};
            font-size: 36px;
            line-height: 1.1;
          }

          .titulo2 {
            font-family: ${opciones?.fuente_titulos};
            font-size: 36px;
          }
        }
      `}</style>
      <Edad options={opciones} />
    </>
  );
};

export default Categorias;
