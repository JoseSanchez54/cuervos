import dynamic from "next/dynamic";
import axios from "axios";
import WooCommerce from "../woocommerce/Woocommerce";
import { useState } from "react";
import { motion } from "framer-motion";
const Nav = dynamic(() => import("../components/Nav"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const Grid = dynamic(() => import("../components/Grid"), { ssr: false });
import { useOptions } from "../hooks/useOptions";
import { useSelector, useDispatch } from "react-redux";

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
  const actual = useSelector((state) => state.configReducer.cart);
  const [caja, setCaja] = useState(null);
  const [fase, setFase] = useState(1);
  const [botellas, setBotellas] = useState(actual.length);
  const { options: optionsSWR } = useOptions(options);
  const dispatch = useDispatch();
  return (
    <>
      <Nav categorias={categorias} opciones={optionsSWR} />
      <div className="flex flex-row lg:min-h-[600px] w-full justify-center my-9">
        <div className="flex flex-col max-w-[1200px] items-center w-full">
          <div className="flex flex-row w-full  justify-center">
            {caja && (
              <span
                style={{
                  fontFamily: options?.fuente_global,
                  color: "black",
                  fontSize: "2rem",
                }}
              >
                {actual.length}/{caja}
              </span>
            )}
          </div>
          {fase === 1 && (
            <div className="flex flex-row min-h-[500px] items-between justify-center w-full">
              <div className="flex flex-col items-center w-full">
                <span
                  className="my-6"
                  style={{
                    fontFamily: options?.fuente_global,
                    color: "black",
                    fontSize: "2rem",
                  }}
                >
                  ¿Cuantas botellas quieres?
                </span>
                <div className="flex flex-row w-full justify-center">
                  <div className="flex max-w-[404px] flex-col w-full">
                    <button
                      onClick={() => {
                        setCaja(3);
                        console.log(botellas);
                        if (botellas > 3) {
                          dispatch({
                            type: "@EMPTY",
                          });
                          setBotellas(0);
                        }
                      }}
                    >
                      caja de 3
                    </button>
                  </div>
                  <div className="flex max-w-[404px] flex-col w-full">
                    <button
                      onClick={() => {
                        setCaja(6);
                        if (botellas > 6) {
                          dispatch({
                            type: "@EMPTY",
                          });
                          setBotellas(0);
                        }
                      }}
                    >
                      caja de 6
                    </button>
                  </div>
                  <div className="flex max-w-[404px] flex-col w-full">
                    <button
                      onClick={() => {
                        setCaja(12);
                        if (botellas > 12) {
                          dispatch({
                            type: "@EMPTY",
                          });
                          setBotellas(0);
                        }
                      }}
                    >
                      caja de 12
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {fase === 2 && (
            <div className="flex flex-row gap-[50px] justify-center w-full">
              <Grid
                productos={productos}
                opciones={options}
                config={true}
                botellas={{ set: setBotellas, value: botellas, caja: caja }}
              />
            </div>
          )}
          <div className="flex flex-row mt-8 w-full justify-between">
            <div className="flex flex-col items-center justify-center w-1/3">
              <motion.button
                initial={{
                  backgroundColor: "black",
                  fontFamily: options?.fuente_global,
                  color: "white",
                  padding: "10px 20px",
                  textTransform: "uppercase",
                  margin: "20px 10px",
                  border: "1px solid black",
                }}
                whileHover={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={() => {
                  setFase(fase - 1);
                }}
              >
                Atrás
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center w-1/3">
              {" "}
              <motion.button
                initial={{
                  backgroundColor: "white",
                  fontFamily: options?.fuente_global,
                  color: "black",
                  padding: "10px 20px",
                  textTransform: "uppercase",
                  margin: "20px 10px",
                  border: "1px solid black",
                }}
                whileHover={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid black",
                }}
                onClick={() => {
                  dispatch({
                    type: "@EMPTY",
                  });
                  setBotellas(0);
                  setFase(1);
                }}
              >
                Limpiar
              </motion.button>
            </div>
            <div className="flex flex-col items-center justify-center w-1/3">
              <motion.button
                initial={{
                  backgroundColor: "black",
                  fontFamily: options?.fuente_global,
                  color: "white",
                  padding: "10px 20px",
                  textTransform: "uppercase",
                  margin: "20px 10px",
                  border: "1px solid black",
                }}
                whileHover={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={() => {
                  if (fase === 1 && caja !== null) {
                    setFase(fase + 1);
                  } else if (fase === 2 && botellas === caja) {
                    setFase(fase + 1);
                  }
                }}
              >
                Siguiente
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <Footer options={optionsSWR} />
    </>
  );
};
export default Configurador;
