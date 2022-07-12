import WooCommerce from "../../woocommerce/Woocommerce";
import axios from "axios";
import fetcherWc from "../../utils/fetcherWc";
import { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "../../components/Nav";
export const getStaticPaths = async () => {
  const products = await WooCommerce.get("products?per_page=50")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  const paths = products.map((produ) => {
    return {
      params: {
        slug: produ.slug.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};
export async function getStaticProps(context) {
  const slug = context.params.slug;

  const products = await fetcherWc("products?slug=" + slug);

  let relacionados = [];
  const getRelacionados = await products[0]?.cross_sell_ids.map((e) => {
    const getting = fetcherWc("products/" + e).then((d) =>
      relacionados.push(d)
    );
  });
  const paquete = await axios
    .get(process.env.URLBASE + "wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data[0].paquete);
  const options = await axios.get(
    process.env.URLBASE + "wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get("products/categories")
    .then((response) => {
      return response.data.filter(
        (fil) => fil.name === products[0]?.categories[0].name
      );
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  const categoriasAll = await WooCommerce.get(
    "products/categories?order=desc"
  ).then((response) => {
    return response.data;
  });

  const variaciones = await WooCommerce.get(
    "products/" + products[0]?.id + "/variations" + "?per_page=50"
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
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
    },
    revalidate: 1,
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
}) => {
  const productToChild = {
    product: products[0],
    variaciones,
  };

  const id = products[0]?.id;
  const precio_final = products[0]?.price;
  const [talla, setTalla] = useState(null);
  const [color, setColor] = useState(null);
  const [test, setTest] = useState([]);
  const [variacionSelecionada, setVariacionSelecionada] = useState({
    color: null,
    talla: null,
    id: null,
  });
  console.log(variaciones);

  const [producto, setProducto] = useState({
    id: products[0]?.id,
    name: products[0]?.name,
    price: products[0]?.price,
    image: products[0]?.images[0]?.src,
    description: products[0]?.description,
    short_description: products[0]?.short_description,
    stock_quantity: products[0]?.stock_quantity,
    stock_status: products[0]?.stock_status,
    sku: products[0]?.sku,
    slug: products[0]?.slug,
    regular_price: products[0]?.regular_price,
    sale_price: products[0]?.sale_price,
    on_sale: products[0]?.on_sale,
    total_sales: products[0]?.total_sales,
    tax_status: products[0]?.tax_status,
    tax_class: products[0]?.tax_class,
    backorders_allowed: products[0]?.backorders_allowed,
    backordered: products[0]?.backordered,
    shipping_class: products[0]?.shipping_class,
    shipping_class_id: products[0]?.shipping_class_id,
    description_html: products[0]?.description_html,
    menu_order: products[0]?.menu_order,
    meta_data: products[0]?.meta_data,
    average_rating: products[0]?.average_rating,
    rating_count: products[0]?.rating_count,
    related_ids: products[0]?.related_ids,
    parent_id: products[0]?.parent_id,
    purchase_note: products[0]?.purchase_note,
    categories: products[0]?.categories,
    tags: products[0]?.tags,
    images: products[0]?.images,
    attributes: products[0]?.attributes,
    downloads: products[0]?.downloads,
  });
  let selectionByColor = [];
  let selectionByTalla = [];

  useEffect(() => {
    variaciones.map((e) => {
      e.attributes.map((atributo) => {
        if (atributo.name === "Color") {
          setVariacionSelecionada({
            ...variacionSelecionada,
            color: color,
          });
        }
      });
    });
    if (color && talla) {
      variaciones.map((e) => {
        e.attributes.filter((r) => {
          if (r.option === color) {
            selectionByColor.push(e);
          }
        });
      });
    }
    if (color && talla) {
      selectionByColor.map((e) => {
        e.attributes.filter((r) => {
          if (r.option === talla) {
            setTest(e);
          }
        });
      });
      setVariacionSelecionada({
        ...variacionSelecionada,
        id: test.id,
      });
    }
  }, [color]);
  useEffect(() => {
    variaciones.map((e) => {
      e.attributes.map((atributo) => {
        if (atributo.name === "Talla") {
          setVariacionSelecionada({
            ...variacionSelecionada,
            talla: talla,
          });
        }
      });
    });
    if (color && talla) {
      variaciones.map((e) => {
        e.attributes.filter((r) => {
          if (r.option === color) {
            selectionByColor.push(e);
          }
        });
      });
    }
    if (color && talla) {
      selectionByColor.map((e) => {
        e.attributes.filter((r) => {
          if (r.option === talla) {
            setTest(e);
          }
        });
      });
      setVariacionSelecionada({
        ...variacionSelecionada,
        id: test.id,
      });
    }
  }, [talla]);
  const metadata = Object.values(producto.meta_data).map((key) => {
    return key;
  });
  const handleTalla = (e) => {
    e.target.classList.add("active");
    setTalla(e.target.attributes.data.value);
  };
  const handleColor = (e) => {
    e.target.classList.add("active");
    setColor(e.target.attributes.data.value);
  };
  useEffect(() => {
    document.querySelectorAll(".size").forEach((e) => {
      if (e.getAttribute("data") !== talla) {
        e.classList.remove("active");
      }
    });
  }, [talla]);
  useEffect(() => {
    document.querySelectorAll(".color").forEach((e) => {
      if (e.getAttribute("data") !== color) {
        e.classList.remove("active");
      }
    });
  }, [color]);
  return (
    <>
      <Nav categorias={categoriasAll} opciones={options} />
      <div className="flex flex-row w-full justify-center mt-[50px]">
        <div className="flex flex-col w-full max-w-[1920px] items-center">
          <div className="flex flex-row gap-9 lg:flex-nowrap flex-wrap w-full justify-center">
            <div className="flex flex-col w-full lg:w-3/5">
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-col w-1/2">
                  <Image
                    height="798px"
                    width="553px"
                    src={producto.images[0].src}
                    quality="100"
                    objectFit="cover"
                  />
                </div>
                <div className="lg:flex hidden flex-col w-1/2">
                  {" "}
                  <Image
                    height="798px"
                    width="553px"
                    src={producto.images[1].src}
                    quality="100"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="lg:flex hidden flex-row justify-center w-full">
                <div className="flex flex-col w-1/2">
                  <Image
                    height="798px"
                    width="553px"
                    src={producto.images[2].src}
                    quality="100"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  {" "}
                  <Image
                    height="798px"
                    width="553px"
                    src={producto.images[3].src}
                    quality="100"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-5 w-full lg:w-2/5">
              <div className="flex flex-row w-full">
                <div className="flex p-5 flex-col">
                  <span className="etiqueta">
                    {metadata.map((e, index) => {
                      if (e.key === "etiqueta") {
                        return e.value;
                      }
                    })}
                  </span>
                  <span className="titulo mt-8">{producto.name}</span>
                  <div
                    className="mb-8"
                    dangerouslySetInnerHTML={{
                      __html: producto.short_description,
                    }}
                  />
                </div>
              </div>
              <div className="divider flex flex-row w-full my-6 px-5"></div>
              <div className="flex flex-row-reverse gap-5 w-full p-5 justify-center">
                {variaciones.map((e, index) => {
                  return (
                    <div key={index} className="flex flex-col w-auto">
                      <button>
                        <Image width="101px" height="108px" src={e.image.src} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .titulo {
          font-family: ${options.fuente_titulos};
          font-size: 36px;
          text-transform: uppercase;
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
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${options.fuente_titulos};
            font-size: 34px;
            line-height: 1.1;
          }
        }
      `}</style>
    </>
  );
};
export default SingleProduct;
