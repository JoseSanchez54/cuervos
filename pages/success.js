import { useRouter } from "next/router";
import useSWR from "swr";
import WooCommerce from "../woocommerce/Woocommerce";
import axios from "axios";
import { useCallback, useRef, useEffect } from "react";
import Nav from "../components/Nav";
import ReactCanvasConfetti from "react-canvas-confetti";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useOrders } from "../hooks/useOrders";
import { DefaultSeo } from "next-seo";
import { fbEvent } from "@rivercode/facebook-conversion-api-nextjs";
export async function getStaticProps() {
  const template = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data[0].plantilla);
  const internos = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data);
  const posts = await axios
    .get(process.env.URLBASE + "wp-json/wp/v2/allposts")
    .then((res) => res?.data);

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  const orders = await WooCommerce.get("orders")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  return {
    props: {
      opciones: options.data[0],
      template: template,
      entradas: posts,
      internos: internos,
      categorias,
      orders,
    },
    revalidate: 10,
  };
}

const Success = ({ categorias, opciones, orders: orders1 }) => {
  const { orders } = useOrders(orders1);
  const dispatch = useDispatch();

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const { query } = useRouter();
  const { wc_order_id, session_id, suscripcion } = query;
  const { data: dataWC } = useSWR(
    () => `/api/success/${wc_order_id}?sus=${suscripcion}&sesion=${session_id}`,
    {
      susID: suscripcion,
      sesion: session_id,
      wc_order_id: wc_order_id,
    }
  );

  const { data, error } = useSWR(() => `/api/checkout_sessions/${session_id}`);

  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  const ids = [];

  const order = orders?.find((order) => order.id == wc_order_id);
  order?.line_items.map((item) => {
    const to = {
      id: item.product_id,
      quantity: 1,
    };
    ids.push(to);
  });

  if (ids.length > 0 && order) {
    fbEvent({
      eventName: "Purchase", // ViewContent, AddToCart, InitiateCheckout or Purchase
      products: ids,
      value: order.total, // optional
      currency: "EUR", // optional
      enableStandardPixel: false,
      test_event_code: "TEST6001", // default false (Require Facebook Pixel to be loaded, see step 2)
    });
  }

  useEffect(() => {
    import("react-facebook-pixel")
      .then((module) => module.default)
      .then((ReactPixel) => {
        const toFB = {
          content_name: order?.line_items[0].name,
          content_ids: ids,
          content_type: "product",
          value: order?.total,
          currency: "EUR",
          num_items: order?.line_items.length,
        };
        if (toFB.value) {
          const res = ReactPixel.track("Purchase", toFB);
        }
      });

    fire();
    dispatch({
      type: "@EMPTY_CART",
    });
  }, [wc_order_id]);

  return (
    <>
      <DefaultSeo
        title={"Cría Cuervos - Pedido completo"}
        description={"El pedido se ha completado correctamente"}
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
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Nav categorias={categorias} opciones={opciones} />

      <div className="flex flex-row w-full h-[75vh] justify-center items-center">
        <div className="flex flex-col max-w-[1202px] justify-center w-full items-center">
          <div className="flex flex-row w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  fontFamily: opciones.fuente_titulos,
                }}
              >
                Tu pedido ha sido recibido
              </span>
              <p
                style={{
                  fontSize: "17px",
                  fontFamily: opciones.fuente_titulos,
                }}
              >
                Oído cocina. Nos ponemos a trabajar en tu pedido de la misma
                manera en la que afrontamos la vida. ¡Aquí y Ahora! Hemos
                mandado a tu email la confirmación de compra. Gracias por tu
                confianza. 
              </p>
              <button
                style={{
                  fontSize: "17px",
                  fontFamily: opciones.fuente_titulos,
                  backgroundColor: "white",
                  color: "#000",
                  border: "1px solid #000",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  marginTop: "20px",
                  "&:hover": {
                    backgroundColor: "#000",
                    color: "white",
                  },
                }}
              >
                <Link href="/" passHref>
                  <a
                    style={{
                      color: "black",
                    }}
                  >
                    Volver a Cría Cuervos
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer options={opciones}></Footer>
      <style jsx>{``}</style>
    </>
  );
};

export default Success;
