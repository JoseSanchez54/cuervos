import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const BlackF = () => {
  const [activo, setActivo] = useState(true);
  const handleActivo = () => {
    setActivo(true);
    localStorage.setItem("blackf", "true");
  };
  useEffect(() => {
    if (localStorage.getItem("blackf") === "true") {
      setActivo(true);
    } else {
      setActivo(false);
    }
  }, []);
  return (
    <>
      {!activo && (
        <>
          <div className="overlay">
            <div className="blackF">
              <div className="flex flex-row w-full">
                <div className="flex flex-col">
                  <div className="flex flex-row  w-full">
                    <div className="flex flex-col">
                      <span
                        className="bebete"
                        style={{
                          color: "black",
                          fontSize: "80px",
                          fontFamily: "Fjalla One",
                        }}
                      >
                        BÉBETE EL
                      </span>
                      <div className="fondo">
                        <span className="blacFtext">BLACK FRIDAY</span>
                      </div>
                      <div className="flex flex-row  mt-9 lg:min-w-[430px]">
                        <div className="flex flex-col">
                          <span
                            style={{
                              color: "black",
                              fontSize: "150px",
                              fontFamily: "Fjalla One",
                              lineHeight: "0.9",
                            }}
                          >
                            30
                          </span>
                        </div>
                        <div className="flex  flex-col">
                          <span
                            style={{
                              color: "black",
                              fontSize: "95px",
                              fontFamily: "Fjalla One",
                              lineHeight: "0.9",
                              textAlign: "center",
                            }}
                          >
                            %
                          </span>
                          <span
                            style={{
                              color: "black",
                              fontSize: "50px",
                              fontFamily: "Fjalla One",
                              lineHeight: "0.9",
                              textAlign: "center",
                            }}
                          >
                            DTO
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row w-full lg:max-w-[238px] h-[5px] max-w-[235px] bg-black"></div>
                      <div className="flex flex-row mt-2 w-full ">
                        <span
                          style={{
                            color: "black",
                            fontSize: "34px",
                            fontFamily: "Fjalla One",
                            lineHeight: "0.9",
                            textAlign: "center",
                          }}
                        >
                          EN TODA LA TIENDA
                        </span>
                      </div>
                      <div className="flex mt-5 justify-start flex-row w-full  max-w-[300px]">
                        <Link
                          style={{ color: "white" }}
                          href="/categoria/todosvinos"
                        >
                          <button className="botoncompra">COMPRAR</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute hidden md:flex right-0 bottom-0">
                <Image width="410px" height="836px" src="/botella1.png"></Image>
              </div>
              <div className="absolute right-4 top-3">
                <button onClick={() => handleActivo()}>
                  <span
                    style={{
                      color: "black",
                      fontSize: "30px",
                      fontFamily: "consolas",
                    }}
                  >
                    X
                  </span>
                </button>
              </div>
            </div>
          </div>
          <style jsx>{`
            .blackF {
              width: 800px;
              height: 800px;
              position: relative;
              background-color: white;
              background-image: url("/fondo1.png");
              padding: 40px;
            }
            .fondo {
              padding: 30px;
              background-color: #a39f8d;
              width: 450px;
            }
            .bebete {
              color: "black";
              font-size: 80px;
              font-family: Fjalla One;
            }
            .blacFtext {
              font-size: 150px;
              color: white;
              font-family: Fjalla One;
              line-height: 0.9;
            }
            a {
              color: white;
            }
            .overlay {
              position: fixed;
              display: flex;
              justify-content: center;
              align-items: center;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 999;
              background-color: rgba(0, 0, 0, 0.5);
            }
            .botoncompra {
              color: white;
              font-size: 33px;
              font-family: Fjalla One;
              line-height: 0.9;
              text-align: center;
              background: black;
              padding: 10px 20px;
              min-width: 245px;
            }
            .botoncompra:hover {
              background-color: transparent;
              color: black;
              border: 2px solid black;
            }
            @media (max-width: 768px) {
              .blackF {
                max-width: 98vw;
                max-height: 98vh;
                position: relative;
                background-color: white;
                background-image: url("/fondo1.png");
                padding: 20px;
              }
              .blacFtext {
                font-size: 100px;
                color: white;
                font-family: Fjalla One;
                line-height: 0.9;
              }
              .bebete {
                color: "black";
                font-size: 60px;
                font-family: Fjalla One;
              }
              .fondo {
                padding: 30px;
                background-color: #a39f8d;
                width: 330px;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};
export default BlackF;
