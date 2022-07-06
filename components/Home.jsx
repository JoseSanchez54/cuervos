import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/Nav"));
const Image = dynamic(() => import("next/image"));
import { motion } from "framer-motion";
import Link from "next/Link";
const HomeCuervos = ({ opciones, pagina, categorias, vinos }) => {
  console.log(vinos);
  return (
    <>
      <Nav categorias={categorias} opciones={opciones} />
      <div className="flex flex-row w-full h-[95vh] alto items-end justify-center">
        <div className="flex flex-col justify-end w-full h-full">
          <div className="relative w-full h-full">
            <div className="flex flex-col justify-end w-full h-full">
              <div className="p-9 z-[10]">
                <span className="z-[10] titulo lg:ml-[40px]">
                  {pagina.titulo}
                </span>
              </div>

              <Image
                objectFit="cover"
                src={pagina.primera_imagen}
                layout="fill"
                priority="high"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center mt-[50px] lg:mt-[100px]">
        <div className="flex flex-col w-full h-full max-w-[1212px]">
          <div className="flex flex-row flex-wrap lg:min-h-[1016px]  w-full lg:h-[1016px]">
            <div className="flex flex-col h-full w-full lg:w-2/3">
              <div className="relative w-full h-full">
                <div className="flex flex-col items-center w-full h-full">
                  <div className="p-9 text-center z-[10]">
                    <span
                      style={{
                        fontSize: "55px",
                      }}
                      className="tituloPrimera z-[10]"
                    >
                      {pagina.segunda_primer_titulo}
                    </span>
                    <p>{pagina.segunda_primer_parrafo}</p>
                  </div>
                  {pagina.segunda_primera_imagen_fondo && (
                    <Image
                      objectFit="cover"
                      layout="fill"
                      src={pagina.segunda_primera_imagen_fondo}
                    ></Image>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{ color: "white" }}
              className="flex flex-col min-h-[500px] lg:w-1/3 w-full h-full"
            >
              <div className="flex flex-col  h-full w-full">
                <div className="flex flex-row h-1/2">
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "40px",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_segundo_titulo}
                        </span>
                        <p>{pagina.segunda_segundo_parrafo}</p>
                      </div>
                      {pagina.segunda_segunda_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_segunda_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row h-1/2">
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_tercer_titulo}
                        </span>
                        <p>{pagina.segunda_tercer_parrafo}</p>
                      </div>
                      {pagina.segunda_tercera_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_tercera_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row  w-full justify-center">
        <div className="flex flex-col w-full h-full max-w-[1212px]">
          <div className="flex flex-row h-[508px] flex-wrap  w-full">
            <div className="flex flex-col w-full lg:w-2/3">
              <div className="flex flex-row min-h-[500px] lg:min-h-[508px] h-full w-full">
                <div
                  style={{ color: "black" }}
                  className="flex flex-col h-full w-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col lg:items-end items-center justify-start w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                            maxWidth: "260px",
                            display: "block",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_cuarto_titulo}
                        </span>
                        <p>{pagina.segunda_cuarto_parrafo}</p>
                      </div>
                      {pagina.segunda_cuarta_imagen_fondo_ && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_cuarta_imagen_fondo_}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] h-full w-full">
                <div
                  style={{ color: "white" }}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-start w-full h-full">
                      <div className="p-9 text-center h-full z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_quinto_titulo}
                        </span>
                        <Link href={pagina.quinto_enlace}>
                          <motion.button
                            initial={{
                              border: "2px solid white",
                              color: "white",
                              backgroundColor: "transparent",
                              zIndex: "10",
                              padding: "20px 20px",
                              marginTop: "25px",
                              fontSize: "14px",
                              fontFamily: opciones.fuente_titulos,
                            }}
                            whileHover={{
                              backgroundColor: "white",
                              color: "black",
                            }}
                          >
                            Encuentra tu Nuevo lugar favorito
                          </motion.button>
                        </Link>
                      </div>
                      {pagina.segunda_quinta_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_quinta_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row  w-full justify-center">
        <div className="flex flex-col w-full h-full max-w-[1212px]">
          <div className="lg:flex hidden flex-row flex-wrap h-[508px]  w-full">
            <div className="flex flex-col w-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] lg:min-h-[508px] h-full w-full">
                <div
                  style={{ color: "black" }}
                  className="flex flex-col h-full w-full"
                >
                  <div className="relative bg-[#F9F8F4] w-full h-full">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="p-9 text-center z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                            maxWidth: "260px",
                            display: "block",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_sexta_titulo}
                        </span>
                        <p>{pagina.segunda_sexto_parrafo}</p>
                      </div>
                      {pagina.segunda_sexta_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_sexta_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] h-full w-full">
                <div
                  style={{ color: "white" }}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-start w-full h-full">
                      <div className="p-9 text-center h-full z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_septima_titulo}
                        </span>
                      </div>
                      {pagina.segunda_septima_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_septima_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:w-1/3">
              <div className="flex flex-row min-h-[500px] h-full w-full">
                <div
                  style={{ color: "white" }}
                  className="flex flex-col w-full h-full"
                >
                  <div className="relative w-full h-full">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="p-9 text-center  z-[10]">
                        <span
                          style={{
                            fontSize: "36px",
                          }}
                          className="tituloPrimera z-[10]"
                        >
                          {pagina.segunda_octava_titulo}
                        </span>
                      </div>
                      {pagina.segunda_octava_imagen_fondo && (
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={pagina.segunda_octava_imagen_fondo}
                        ></Image>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center mt-[40px] lg:mt-[100px]">
        <div className="flex flex-col w-full max-w-[1016px]">
          <div className="flex flex-row w-full">
            <span className="tituloseccion">Elige tu vino</span>
          </div>
          <div className="flex flex-row w-full"></div>
        </div>
      </div>

      <style jsx>{`
        .titulo {
          font-family: ${opciones.fuente_titulos};
          font-size: 120px;
        }
        .tituloPrimera {
          font-family: ${opciones.fuente_titulos};
        }
        .parrafoPrimera {
          font-family: ${opciones.fuente_global};
          font-size: 16px;
        }
        .alto {
          height: calc(100vh - 144px);
        }
        .tituloseccion {
          font-family: ${opciones.fuente_titulos};
          font-size: 36px;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones.fuente_titulos};
            font-size: 90px;
            line-height: 1.1;
          }
          .flex-col {
            min-height: 500px;
          }
        }
      `}</style>
    </>
  );
};
export default HomeCuervos;
