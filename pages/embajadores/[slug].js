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
  console.log(context.params);
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
    revalidate: 10,
  };
}
const Embajador = ({ embajador, options, categorias }) => {
  console.log(embajador);
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
