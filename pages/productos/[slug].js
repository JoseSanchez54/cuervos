import WooCommerce from "../../woocommerce/Woocommerce";
import { useEffect, useState } from "react";
import fetcherWc from "../../utils/fetcherWc";
import axios from "axios";
import SingleProducto from "../../components/MarketPlace/SingleProducto";

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

  const variaciones = await WooCommerce.get(
    "products/" + products[0]?.id + "/variations" + "?per_page=50"
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  switch (paquete) {
    case "ecommerce":
      return {
        props: {
          products,
          variaciones,
          slug,
          paquete,
          options: options.data,
          categorias,
          relacionados,
        },
        revalidate: 1,
      };
    default:
      return {
        notFound: true,
      };
  }
}
const SingleProduct = ({
  products,
  variaciones,
  slug,
  paquete,
  options,
  categorias,
  relacionados,
}) => {
  /*   const { data } = useSWR("products?slug=" + slug, fetcher, {
    initialData: products,
    refreshInterval: 1,
  }); */
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
      <SingleProducto
        producto={producto}
        variaciones={variaciones}
        options={options}
        categorias={categorias}
        relacionados={relacionados}
      />

      {/* <div className="flex flex-row justify-end w-full mt-5">
        {products.map((product, index) => {
          return (
            <AddToCart
              key={index}
              img={product.images[0].src}
              id={id}
              precio={precio_final}
              simple={false}
              nombre={product.name}
              atributo={{ talla, color }}
              variacion={test}
              shipping_class={
                test && test.shipping_class !== ""
                  ? test.shipping_class
                  : producto.shipping_class
              }
              shipping_class_id={
                test && test.shipping_class_id !== ""
                  ? test.shipping_class_id
                  : producto.shipping_class_id
              }
            >
              Lo quiero
            </AddToCart>
          );
        })}
      </div>
 */}

      <style jsx>{``}</style>
    </>
  );
};
export default SingleProduct;
