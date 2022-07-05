import { usePages } from "../../hooks/usePages";
import axios from "axios";
import dynamic from "next/dynamic";
const Head = dynamic(() => import("next/head"), { ssr: false });
const HomeBlog = dynamic(() => import("../../components/Blog/Home"), {
  ssr: false,
});

const PostsFeed = dynamic(() => import("../../components/Blog/PostsFeed"), {
  ssr: false,
});

export async function getStaticProps() {
  const template = await axios
    .get(process.env.URLBASE + "/wp-json/jet-cct/ajustes_internos/")
    .then((res) => res.data[0].plantilla);
  const posts = await axios
    .get(process.env.URLBASE + "wp-json/wp/v2/allposts")
    .then((res) => res?.data);

  const pagesNew = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  );
  const home2 = await pagesNew.data.find(
    (page) => page.pagina_asociada === "Principal"
  );

  const options = await axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  );

  return {
    props: {
      options1: options.data,
      pagesNew: home2,
      template: template,
      entradas: posts,
    },
    revalidate: 10,
  };
}
const Blog = ({ entradas, options1, pagesNew }) => {
  const { data, isLoading: cargar } = usePages(pagesNew, "Principal");
  const { segundo_color, color_de_fondo } = data;
  return (
    <>
      <Head>
        <title>News | MWLB - Agencia de Marketing</title>
        <link rel="icon" href="/mgris.png" />
        <meta
          name="description"
          content="MWLB es una agencia de marketing, comunicación y publicidad especializada en el sector digital. Creamos experiencias para el usuario, poniendo mucho cuidado en los detalles y en el diseño."
        />
        <link rel="canonical" href="https://mwlb.es" />
        <meta property="og:title" content="MWLB" />
        <meta
          property="og:description"
          content="MWLB es una agencia de marketing, comunicación y publicidad especializada en el sector digital. Creamos experiencias para el usuario, poniendo mucho cuidado en los detalles y en el diseño."
        />
        <meta property="og:url" content="https://mwlb.es" />
        <meta property="og:image" content="/logo_MWLB.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MWLB" />
      </Head>

      <HomeBlog options={options1} pagesNew={pagesNew} entradas={entradas} />

      <style jsx>{`
        .fondo {
          background-color: #fafafa;
          width: 100%;
        }
        .columna {
          max-width: 1475px;
        }
        @media (max-width: 768px) {
          .columna {
            max-width: 100%;
          }
        }
        @media (max-width: 1400px) {
          .columna {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};
export default Blog;
