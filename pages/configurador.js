import dynamic from "next/dynamic";
import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useState } from "react";
const Nav = dynamic(() => import("../components/Nav"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const Grid = dynamic(() => import("../components/Grid"), { ssr: false });
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
  const productos = await WooCommerce.get(
    "products?per_page=100&status=publish&category=1447"
  ).then((response) => {
    return response.data;
  });
  return {
    props: {
      options: options.data[0],
      categorias,
      pagina,
      productos,
    },
    revalidate: 10,
  };
}

const Configurador = ({ options, categorias, productos }) => {
  const [caja, setCaja] = useState(null);
  const [botellas, setBotellas] = useState(0);
  const { isLoading, options: optionsSWR } = useOptions(options);
  return (
    <>
      <Nav categorias={categorias} opciones={optionsSWR} />
      <div className="flex flex-row w-full justify-center my-9">
        <div className="flex flex-col items-center w-full">
          {caja && (
            <span>
              {botellas}/{caja}
            </span>
          )}

          <div className="flex flex-row min-h-[500px] items-center justify-center w-full">
            <div className="flex max-w-[404px] flex-col w-full">
              <button onClick={() => setCaja(3)}>caja de 3</button>
            </div>
            <div className="flex max-w-[404px] flex-col w-full">
              <button onClick={() => setCaja(6)}>caja de 6</button>
            </div>
            <div className="flex max-w-[404px] flex-col w-full">
              <button onClick={() => setCaja(12)}>caja de 12</button>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <Grid
              productos={productos}
              opciones={options}
              config={true}
              botellas={{ set: setBotellas, value: botellas, caja: caja }}
            />
          </div>
        </div>
      </div>
      <Footer options={optionsSWR} />
    </>
  );
};
export default Configurador;
