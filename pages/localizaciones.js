import dynamic from "next/dynamic";
import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useState, useEffect } from "react";

const Nav = dynamic(() => import("../components/Nav"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const DefaultSeo = dynamic(
  () => import("next-seo").then((mod) => mod.DefaultSeo),
  { ssr: false }
);
import { useOptions } from "../hooks/useOptions";

export async function getStaticProps() {
  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );
  const categorias = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const pagina = await pagesNew.data.find(
    (page) => page.pagina_asociada === "area"
  );

  return {
    props: {
      options: options.data[0],
      categorias,
      pagina,
    },
    revalidate: 10,
  };
}

const Localizaciones = ({ options, categorias }) => {
  const [caja, setCaja] = useState(null);
  const [botellas, setBotellas] = useState(0);
  const { isLoading, options: optionsSWR } = useOptions(options);
  useEffect(() => {
    (function (s, t, o, c, k) {
      c = s.createElement(t);
      c.src = o;
      c.async = 1;
      k = s.getElementsByTagName(t)[0];
      k.parentNode.insertBefore(c, k);
    })(document, "script", "//stockist.co/embed/v1/widget.min.js");
  }, []);
  return (
    <>
      <DefaultSeo
        title={"Cría Cuervos - Localizaciones"}
        description={"Localizaciones donde puedes encontrar Vinos Cría Cuervos"}
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
      <Nav categorias={categorias} opciones={optionsSWR} />
      <div className="flex flex-row w-full justify-center my-9">
        <div className="flex flex-col p-5 max-w-[1220px] items-center w-full">
          <span
            className="xl:my-9 my-4 text-center titulo"
            style={{
              fontFamily: optionsSWR?.fuente_global,
            }}
          >
            ¿Donde puedes encontrarnos?
          </span>
          <div data-stockist-widget-tag="u13755">Cargando... </div>
        </div>
      </div>
      <Footer options={optionsSWR} />
      <style jsx>{`
        .titulo {
          font-size: 50px;
          line-height: 1.1;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-size: 38px;
            line-height: 1.1;
          }
        }
      `}</style>
    </>
  );
};
export default Localizaciones;
