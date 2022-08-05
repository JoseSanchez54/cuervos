import WooCommerce from "../../woocommerce/Woocommerce";
import axios from "axios";
import fetcherWc from "../../utils/fetcherWc";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "../../components/Nav";
import useMobile from "../../hooks/useMobile";
import AddToCart from "../../components/AddToCart";
import { DefaultSeo } from "next-seo";
import { motion } from "framer-motion";
import Link from "next/link";
import Grid from "../../components/Grid";
import Footer from "../../components/Footer";
import { useProduct } from "../../hooks/useProduct";
import Edad from "../../components/Edad";
import useSWR from "swr";
export const getStaticPaths = async () => {
  const products = await WooCommerce.get("products?per_page=50").then(
    (response) => {
      return response.data;
    }
  );

  const paths = products.map((produ) => {
    return {
      params: {
        slug: produ.slug.toString(),
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

  const products = await fetcherWc("products?slug=" + slug);

  let relacionados = [];
  const getRelacionados = await products[0]?.related_ids.map((e) => {
    const getting = fetcherWc("products/" + e).then((d) =>
      relacionados.push(d)
    );
  });
  let upSells = [];
  const getUpsells = await products[0]?.upsell_ids.map((e) => {
    const getting = fetcherWc("products/" + e).then((d) => upSells.push(d));
  });
  const paquete = await axios
    .get(process.env.URLBASE + "wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data[0].paquete);
  const options = await axios.get(
    process.env.URLBASE + "wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get("products/categories").then(
    (response) => {
      return response.data.filter(
        (fil) => fil.name === products[0]?.categories[0].name
      );
    }
  );

  const categoriasAll = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });

  const variaciones = await WooCommerce.get(
    "products/" + products[0]?.id + "/variations" + "?per_page=50"
  ).then((response) => {
    return response.data;
  });

  return {
    props: {
      products,
      variaciones,
      slug,
      paquete,
      options: options.data[0],
      categorias,
      relacionados,
      categoriasAll,
      upSells,
    },
    revalidate: 1000,
  };
}
const SingleProduct = ({
  products,
  variaciones,
  slug,
  paquete,
  options,
  categorias,
  relacionados,
  categoriasAll,
  upSells,
}) => {
  //const { product, isValidating } = useProduct(products[0], products[0]?.id);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error, mutate } = useSWR("/api/producto", fetcher, {
    id: products[0]?.id,
    refreshInterval: 10000,
  });
  const variations = useSWR(
    "products/" + products[0]?.id + "variations",
    fetcherWc,
    {
      fallbackData: variaciones,
      refreshInterval: 10000,
    }
  );

  const pedidos1 = useSWR("products/" + products[0]?.id, fetcherWc, {
    refreshInterval: 10000,
    fallbackData: products[0],
  });
  const product = pedidos1.data;
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const [isVino, setIsVino] = useState(false);
  useEffect(() => {
    product?.categories.map((f) => {
      if (f.name === "Vinos") {
        setIsVino(true);
      }
    });
  }, []);

  const [precio, setPrecio] = useState(product?.price);
  const handlePrecio = (precio) => {
    setPrecio(precio);
  };

  const metadata = Object?.values(product?.meta_data).map((key) => {
    return key;
  });
  const video = metadata?.filter((m) => m.key === "video")[0]?.value;

  const imagenBanner = metadata.filter((m) => m.key === "imagen_vinero")[0]
    ?.value;
  const tituloBanner = metadata.filter((m) => m.key === "titulo_banner")[0]
    ?.value;
  const parrafoBanner = metadata.filter(
    (m) => m.key === "parrafo_banner_copy"
  )[0]?.value;

  function definirVariaciones(p, v) {
    const atributos = p.attributes
      .filter((e, index) => e.variation === true)
      .map((e) => {
        const objeto = {
          nombre: e.name,
          opciones: e.options,
        };
        const variable = true;
        return {
          ...objeto,
          variable,
        };
      });

    return atributos;
  }
  const atributos = definirVariaciones(product, variaciones);

  let tt = atributos.map((res) => {
    let objeto = {
      ...tt,
      [res.nombre]: res.opciones[0],
    };
    return objeto;
  });
  let newTT = new Object();

  atributos.forEach(function (valor, indice) {
    var key = valor.nombre;
    var value = valor.opciones[0];
    newTT[key] = value;
  });

  const [seleccion, setSeleccion] = useState(newTT);
  const handleVariations = (e, tipo) => {
    document
      .getElementsByClassName("activoVariacion")[0]
      ?.classList.remove("activoVariacion");

    const resultado = {
      ...seleccion,
      [tipo]: e.currentTarget.value,
    };
    e.target.classList.add("activoVariacion");
    setSeleccion(resultado);
  };
  const { isMobile } = useMobile();
  return (
    <>
      <DefaultSeo
        title={"Cría Cuervos - " + product?.name}
        description={product?.short_description}
        canonical={process.env.URLFINAL + "/" + product?.slug}
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
          description: product?.short_description,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Nav categorias={categoriasAll} opciones={options} />

      <div className="flex flex-row w-full justify-center mt-[50px]">
        <div className="flex flex-col w-full max-w-[1920px] items-center">
          <div className="flex flex-row gap-9 lg:flex-nowrap flex-wrap w-full justify-center">
            <div className="flex flex-col w-full lg:w-3/5">
              <div className="flex flex-row justify-center w-full">
                <div className="flex max-h-[768px] flex-col w-1/2">
                  {metadata.filter((m) => m.key === "video")[0]?.value ? (
                    <>
                      {isMobile ? (
                        <Image
                          height="798px"
                          width="553px"
                          src={product?.images[0].src}
                          quality="100"
                          objectFit="cover"
                        />
                      ) : (
                        <video
                          key={video}
                          preload="auto"
                          autoPlay={true}
                          loop
                          className="video-portada"
                          muted
                          playsInline
                          poster={
                            product?.images[0].src ? product?.images[0].src : ""
                          }
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                        >
                          <source src={video} type="video/mp4" />
                        </video>
                      )}
                    </>
                  ) : (
                    <>
                      {product?.images[0].src && (
                        <Image
                          height="798px"
                          width="553px"
                          src={product?.images[0].src}
                          quality="100"
                          objectFit="cover"
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="lg:flex hidden flex-col w-1/2">
                  {product?.images.length > 1 && (
                    <Image
                      height="798px"
                      width="553px"
                      src={product?.images[1].src}
                      quality="100"
                      objectFit="cover"
                    />
                  )}
                </div>
              </div>
              <div className="lg:flex hidden flex-row justify-center w-full">
                <div className="flex flex-col w-1/2">
                  {product?.images.length > 2 && (
                    <Image
                      height="798px"
                      width="553px"
                      src={product?.images[2].src}
                      quality="100"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  {" "}
                  {product?.images.length > 3 && (
                    <Image
                      height="798px"
                      width="553px"
                      src={product?.images[3].src}
                      quality="100"
                      objectFit="cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-5 lg:h-[1600px] w-full lg:w-2/5">
              <div className="w-full flex flex-col self-start top-[90px]">
                <div className="flex flex-row w-full">
                  <div className="flex p-5 flex-col">
                    <span className="etiqueta">
                      {metadata.map((e, index) => {
                        if (e.key === "etiqueta") {
                          return e.value;
                        }
                      })}
                    </span>
                    <span className="titulo my-6">{product?.name}</span>
                    <span className="inyectado mb-6">
                      {removeTags(product?.short_description)}
                    </span>
                    <span
                      className="precio"
                      key={product?.id}
                      style={{
                        color: "black",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                        fontFamily: options.fuente_titulo,
                      }}
                    >
                      {precio}€
                    </span>
                  </div>
                </div>
                <div className="divider flex flex-row w-full my-[30px] px-5"></div>
                {variaciones.length > 0 && (
                  <>
                    <div className="flex lg:flex-row-reverse  gap-5 w-full p-5 lg:flex-nowrap flex-wrap justify-center">
                      {variaciones.map((e, index) => {
                        return (
                          <div key={index} className="flex flex-col w-auto">
                            <button
                              style={{
                                border:
                                  seleccion.botellas === e.attributes[0].option
                                    ? "solid 2px #000"
                                    : "none",

                                borderRadius: "10px",
                              }}
                              className="botonVaria relative w-[101px] h-[108px]"
                              value={e.attributes[0].option}
                              onClick={(r) =>
                                handleVariations(r, e.attributes[0].name)
                              }
                            >
                              <Image
                                width="101px"
                                height="108px"
                                layout="fill"
                                src={e.image.src}
                                quality="100"
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                <div className="flex flex-row mt-7 p-5 w-full">
                  <AddToCart
                    lista={variaciones}
                    producto={product}
                    opciones={options}
                    seleccion={seleccion}
                    precio={handlePrecio}
                  />
                </div>
                <div className="flex flex-row mt-9 w-full justify-center">
                  <div className="flex flex-col tems-center p-5 min-w-[200px]">
                    <div
                      style={{
                        border: "solid 2px black",
                        borderRadius: "6px",
                      }}
                      className="flex flex-row gap-5  lg:flex-nowrap flex-wrap w-full p-8"
                    >
                      {" "}
                      <div className="flex flex-col items-center w-full lg:w-1/2">
                        <Image
                          objectFit="contain"
                          height="25px"
                          width="31px"
                          src="/truck.png"
                          quality="100"
                        ></Image>
                        <span
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            fontFamily: options.fuente_titulos,
                            marginTop: "10px",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Recibe tu pedido en 48 a 72 hrs.
                        </span>
                      </div>
                      <div className="flex flex-col items-center w-full lg:w-1/2">
                        <Image
                          objectFit="contain"
                          height="25px"
                          width="31px"
                          src="/shop.png"
                          quality="100"
                        ></Image>
                        <span>
                          <span
                            style={{
                              fontSize: "14px",
                              textAlign: "center",
                              fontFamily: options.fuente_titulos,
                              marginTop: "10px",
                              display: "block",
                              fontWeight: "bold",
                            }}
                          >
                            Envíos gratuitos desde 50€
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/*             <div className="flex flex-row mt-9 w-full justify-center">
                  <div className="flex flex-col w-full max-w-[556px] p-5 items-center">
                    <div className="flex flex-row flex-wrap lg:flex-nowrap justify-around gap-5 p-5 w-full bg-black">
                      <div className="flex flex-col w-full lg:w-auto justify-center">
                        <Image
                          objectFit="contain"
                          height="81px"
                          width="80px"
                          src="/calendar.png"
                          quality="100"
                        />
                      </div>
                      <div className="flex flex-col w-full max-w-[220px] lg:w-auto items-center lg:items-start justify-center">
                        <span
                          style={{
                            fontSize: "20px",
                            color: "#fff",
                            fontFamily: options.fuente_titulos,
                            textTransform: "uppercase",
                          }}
                        >
                          Suscripción Cría Cuervos
                        </span>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#fff",
                            fontFamily: options.fuente_global,
                            lineHeight: "1.1",
                            textTransform: "uppercase",
                          }}
                        >
                          Recibe periódicamente tus vinos en la comodidad de tu
                          casa
                        </p>
                      </div>
                      <div className="flex flex-col w-full lg:w-auto  items-center lg:items-start justify-center">
                        <Link href="/suscripcion" passHref>
                          <a>
                            <motion.button
                              initial={{
                                backgroundColor: "white",
                                border: "solid 2px #fff",
                                color: "#000",
                                padding: "10px 20px",
                                fontSize: "9px",
                                textTransform: "uppercase",
                              }}
                              whileHover={{
                                backgroundColor: "transparent",
                                border: "solid 2px #fff",
                                color: "#fff",
                              }}
                            >
                              Sucríbete hoy
                            </motion.button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="divider flex flex-row w-full my-[30px] px-5"></div>
                <div className="flex p-5 flex-row gap-3 w-full justify-start ">
                  <div className="lg:flex hidden flex-col min-w-[50px]">
                    {" "}
                    <Image
                      objectFit="contain"
                      height="24px"
                      width="24px"
                      src="/plus.png"
                      quality="100"
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span
                      style={{
                        fontSize: "16px",
                        fontFamily: options.fuente_global,
                        textTransform: "uppercase",
                      }}
                    >
                      Los detalles de nuestro {product?.name}
                    </span>
                    <span className="inyectado2 mt-6">
                      {removeTags(product?.description)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isVino && (
            <>
              {" "}
              <div className="flex mt-[80px] flex-row w-full justify-center">
                <div className="flex flex-col w-full max-w-[1202px] p-5 items-center">
                  <div className="relative flex w-full lg:min-h-[490px] min-h-[290px]  p-[20px] lg:p-[40px]">
                    <div className="flex flex-col md:justify-center lg:justify-start justify-center w-full z-20">
                      {tituloBanner ? (
                        <span
                          className="lg:max-w-[400px] w-full "
                          style={{
                            fontSize: "55px",
                            fontFamily: options.fuente_titulos,
                            color: "#fff",
                            lineHeight: "1.1",
                          }}
                        >
                          {tituloBanner}
                        </span>
                      ) : (
                        <span
                          className="lg:max-w-[400px] w-full "
                          style={{
                            fontSize: "55px",
                            fontFamily: options.fuente_titulos,
                            color: "#fff",
                            lineHeight: "1.1",
                          }}
                        >
                          CONOCE PESQUERA DEL DUERO
                        </span>
                      )}
                      {parrafoBanner && (
                        <span
                          className="lg:max-w-[300px] w-full"
                          style={{
                            fontSize: "16px",
                            fontFamily: options.fuente_global,
                            color: "#fff",
                            lineHeight: "1.1",
                            marginTop: "10px",
                          }}
                        >
                          {parrafoBanner}
                        </span>
                      )}
                    </div>

                    {imagenBanner ? (
                      <Image
                        src={imagenBanner}
                        layout="fill"
                        objectFit="cover"
                        quality="100"
                      ></Image>
                    ) : (
                      <Image
                        src="/vino.png"
                        layout="fill"
                        objectFit="cover"
                        quality="100"
                      ></Image>
                    )}
                  </div>
                </div>
              </div>
              {metadata.filter((m) => m.key === "variedad")[0]?.value && (
                <div
                  style={{
                    background: isMobile
                      ? "transparent"
                      : "linear-gradient(90deg, #000 50%, #fff 50%)",
                  }}
                  className="flex flex-row w-full mt-[80px] justify-center"
                >
                  <div className="flex flex-col w-full max-w-[1202px]">
                    <div className="flex flex-row gap-6 flex-wrap lg:flex-nowrap w-full justify-center">
                      <div
                        style={{
                          background: isMobile ? "black" : "transparent",
                        }}
                        className="flex flex-col gap-3 pt-9 p-7 w-full "
                      >
                        <span
                          style={{
                            fontSize: "24px",
                            fontFamily: options.fuente_titulos,
                            textTransform: "uppercase",
                            color: "#fff",
                            marginBottom: "20px",
                          }}
                        >
                          FICHA TÉCNICA
                        </span>

                        <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            Variedad
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter((m) => m.key === "variedad")[0]
                                ?.value
                            }
                          </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            AÑADA
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter((m) => m.key === "anada")[0]
                                ?.value
                            }
                          </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            GRADO ALCOHÓLICO
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter(
                                (m) => m.key === "grado-alcoholico"
                              )[0]?.value
                            }
                          </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            LOCALIZACIÓN
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter(
                                (m) => m.key === "localizacion"
                              )[0]?.value
                            }
                          </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            CRIANZA
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter((m) => m.key === "crianza")[0]
                                ?.value
                            }
                          </span>
                        </div>
                        {/*   <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            TIPO DE SUELO
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter((m) => m.key === "suelo")[0]
                                ?.value
                            }
                          </span>
                        </div> */}
                        <div className="flex flex-row gap-2 items-center">
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: options.fuente_global,
                              textTransform: "uppercase",
                              color: "#fff",
                            }}
                          >
                            FORMATO DE BOTELLA
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontFamily: options.fuente_global,
                              color: "#fff",
                            }}
                          >
                            {
                              metadata.filter((m) => m.key === "formato")[0]
                                ?.value
                            }
                          </span>
                        </div>
                        <div className="flex flex-row w-full">
                          {" "}
                          {metadata.filter((m) => m.key === "imagen_tecnica")[0]
                            .value ? (
                            <Image
                              height="88px"
                              width="239px"
                              src={
                                metadata.filter(
                                  (m) => m.key === "imagen_tecnica"
                                )[0].value
                              }
                              objectFit="contain"
                              quality="100"
                            ></Image>
                          ) : (
                            <Image
                              height="88px"
                              width="239px"
                              src="/duero.png"
                              objectFit="contain"
                              quality="100"
                            ></Image>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center pt-9 p-7  w-full">
                        <span
                          style={{
                            fontSize: "27px",
                            fontFamily: options.fuente_titulos,
                            textTransform: "uppercase",
                            color: "#000",
                            marginBottom: "20px",
                          }}
                        >
                          NOTAS DE CATA
                        </span>
                        {metadata.filter((m) => m.key === "notas")[0]
                          ?.value && (
                          <Image
                            height="300px"
                            width="443px"
                            quality="100"
                            src={
                              metadata.filter((m) => m.key === "notas")[0]
                                ?.value
                            }
                            objectFit="contain"
                          ></Image>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex flex-row p-5 lg:mt-[100px] w-full justify-center">
            <div className="flex flex-col w-full max-w-[1202px]">
              <div className="flex flex-row w-full lg:justify-start justify-center">
                <span
                  style={{
                    fontSize: "24px",
                    fontFamily: options.fuente_titulos,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                >
                  TAMBIÉN TE PUEDE INTERESAR
                </span>
              </div>
              <div className="flex flex-row lg:flex-nowrap flex-wrap w-full  my-9 lg:justify-start justify-center">
                {upSells.length > 0 ? (
                  <Grid productos={upSells} opciones={options} max={3} />
                ) : (
                  <Grid productos={relacionados} opciones={options} max={3} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer options={options}></Footer>

      <style jsx>{`
        .titulo {
          font-family: ${options.fuente_titulos};
          font-size: 36px;
          text-transform: uppercase;
        }
        .inyectado {
          font-family: ${options.fuente_global};
          font-weight: bold;
          font-size: 16px;
          line-height: 1.3;
        }
        .inyectado2 {
          font-family: ${options.fuente_global};
          font-size: 16px;
          line-height: 1.3;
        }
        .tituloPrimera {
          font-family: ${options.fuente_titulos};
        }
        .parrafoPrimera {
          font-family: ${options.fuente_global};
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
        }
        .tituloseccion {
          font-family: ${options.fuente_titulos};
          font-size: 36px;
        }
        .etiqueta {
          font-family: ${options.fuente_global};
          font-size: 18px;
          text-transform: uppercase;
          background-color: black;
          color: white;
          padding: 10px 20px;
          width: fit-content;
        }
        .divider {
          border-bottom: 1px solid black;
        }
        .activoVariacion {
          border: solid black 2px;
          border-radius: 7px;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${options.fuente_titulos};
            font-size: 34px;
            line-height: 1.1;
          }
        }
      `}</style>
      <Edad options={options} />
    </>
  );
};
export default SingleProduct;
