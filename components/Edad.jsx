import Image from "next/image";
import { useState, useEffect } from "react";
const Edad = ({ options }) => {
  const [activo, setActivo] = useState(false);
  const handleActivo = () => {
    setActivo(true);
    localStorage.setItem("edad", "true");
  };
  useEffect(() => {
    if (localStorage.getItem("edad") === "true") {
      setActivo(true);
    }
  }, []);
  return (
    <>
      {!activo && (
        <>
          <div className="flex fixed z-50 bg-white top-0 left-0 right-0 bottom-0 flex-row justify-center items-center w-screen h-screen">
            <div className="flex flex-col w-full max-w-[1200px] items-center h-full justify-between">
              <Image
                objectFit="contain"
                src="/logo.png"
                width="100px"
                height="100px"
              ></Image>
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-col items-center w-full">
                  <span className="titulo">¿Eres mayor de edad?</span>
                  <div className="flex flex-row mt-9 gap-5 justify-center w-full">
                    <button onClick={() => handleActivo()} className="boton">
                      Si
                    </button>
                    <a href="https://google.com">
                      <button className="boton">No</button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex mb-9 flex-row justify-center w-full">
                <div className="flex flex-col items-center w-full">
                  <span>Beba con responsabilidad</span>
                  <span>
                    Al entrar aceptas los{" "}
                    <a
                      style={{ color: "black", fontWeight: "bold" }}
                      href="/legal/aviso_legal"
                    >
                      términos y condiciones
                    </a>{" "}
                    y la{" "}
                    <a
                      style={{ color: "black", fontWeight: "bold" }}
                      href="/legal/politica-de-privacidad"
                    >
                      politica de cookies
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .titulo {
              font-family: ${options.fuente_titulos};
              font-size: 36px;
            }
            .boton {
              background-color: transparent;
              color: black;
              padding: 30px 80px;
              border: 1px solid black;
              font-family: ${options.fuente_titulos};
              font-size: 34px;
            }
            .boton:hover {
              background-color: black;
              color: white;
              padding: 30px 80px;
              border: 1px solid black;
            }
            .titulo2 {
              font-family: ${options.fuente_titulos};
              font-size: 55px;
              color: white;
            }
            @media (max-width: 1022px) {
              .titulo {
                font-family: ${options.fuente_titulos};
                font-size: 36px;
                line-height: 1.1;
              }

              .titulo2 {
                font-family: ${options.fuente_titulos};
                font-size: 36px;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};
export default Edad;
