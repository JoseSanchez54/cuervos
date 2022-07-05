import dynamic from "next/dynamic";
import Axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
const Footer = dynamic(() => import("../../components/DigitalEstudio/Footer"), {
  ssr: false,
});
const ShareThis = dynamic(() => import("../../components/Blog/ShareThis"), {
  ssr: false,
});
const Head = dynamic(() => import("next/head"), { ssr: false });
const Link = dynamic(() => import("next/link"), { ssr: false });
const Image = dynamic(() => import("next/image"), { ssr: false });
const PostNextandPrev = dynamic(
  () => import("../../components/Blog/PostNextandPrev"),
  { ssr: false }
);
const NavBar = dynamic(() => import("../../components/DigitalEstudio/Navbar"), {
  ssr: false,
});
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false,
});
import SinglePost from "../../components/Blog/SingleBlog";

export async function getStaticPaths() {
  const posts = await Axios.get(
    process.env.URLBASE + "wp-json/wp/v2/allposts"
  ).then((res) => res?.data);
  const path = posts.map((post) => {
    return {
      params: { slug: post?.slug?.toString() },
    };
  });
  return {
    paths: path,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const currentpost = await Axios.get(
    process.env.URLBASE + "wp-json/wp/v2/singleposts/" + context?.params?.slug
  ).then((res) => res?.data);
  const posts = await Axios.get(
    process.env.URLBASE + "wp-json/wp/v2/allposts"
  ).then((res) => res?.data);
  const options = await Axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/opciones_generales/"
  ).then((res) => res?.data);
  const internos = await Axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/ajustes_internos/"
  ).then((res) => res.data[0].plantilla);
  const pagesNew = await Axios.get(
    process.env.URLBASE + "/wp-json/jet-cct/paginas"
  ).then((res) => res.data);

  return {
    props: {
      currentpost,
      posts,
      options,
      pagesNew,
      internos,
    },
  };
}

const Post = (props) => {
  return (
    <>
      <SinglePost props={props} />
    </>
  );
};
export default Post;
