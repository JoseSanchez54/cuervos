import fs from "fs";
import WooCommerce from "../woocommerce/Woocommerce";

const Sitemap = (props) => {
  //console.log(props)
};
const checkDomain = (datad) => {
  if (datad.includes("https://")) {
    return datad;
  } else if (datad.includes("http://")) {
    return datad.replace("http://", "https://");
  } else {
    return "https://" + datad;
  }
};

export async function getServerSideProps({ res }) {
  const products = await WooCommerce.get("products?per_page=99").then(
    (response) => {
      return response.data;
    }
  );
  const categorias = await WooCommerce.get(
    "products/categories?per_page=100"
  ).then((response) => {
    return response.data;
  });

  const YOUR_URL = checkDomain("vinoscriacuervos.com");
  const baseUrl = {
    development: YOUR_URL,
    production: YOUR_URL,
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync(
      {
        development: "pages",
        production: "./",
      }[process.env.NODE_ENV]
    )
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
        "robots.txt",
        "[slug].js",
        "*/[slug].js",
        "legal",
        "legal/*",
        "page",
        "category",
        "api",
        "api/*",
        ,
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  /*
    
    ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>


        ${products
          .map((post) => {
            return `
            <url>
              <loc>${baseUrl}/productos/${post.slug}</loc>
              <lastmod>${new Date(post.date_modified).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
          `;
          })
          .join("")}
          ${categorias
            .map((post) => {
              return `
            <url>
              <loc>${baseUrl}/categoria/${post.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
          `;
            })
            .join("")}
      <url>
        <loc>${baseUrl}/contacto</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
      </url> 
      <url>
        <loc>${baseUrl}/sobre-nosotros</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
      </url> 
      <url>
        <loc>${baseUrl}/nuestra-vision</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
      </url> 
 
  
      <url>
        <loc>${baseUrl}/legal/aviso_legal</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
      </url>    
      <url>
        <loc>${baseUrl}/legal/politica-de-privacidad</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
      </url>  
      <url>
        <loc>${baseUrl}/legal/politica-de-privacidad</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
      </url>           
    </urlset>
  `;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=43200, stale-while-revalidate=60"
  );
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {
      sitemap: sitemap,
    },
  };
}

export default Sitemap;
