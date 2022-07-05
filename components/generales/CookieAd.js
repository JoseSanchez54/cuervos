import Image from "next/image";
import { useOptions } from "../../hooks/useOptions";
import { motion } from "framer-motion";
import useMobile from "../../hooks/useMobile";

const CookieAd = ({ funcion }) => {
  const { options, isLoading } = useOptions();
  const { isMobile } = useMobile();
  const handleClick = () => {
    localStorage.setItem("cookieAd", "true");
    funcion("true");
  };

  const valuesBoton = {
    hover: {
      backgroundColor: options[0]?.color_boton_cookies_copy,
      color: "#fff",
    },
    initial: {
      backgroundColor: options[0]?.color_boton_cookies,
      color: "#000",
      borderRadius: "28px",
      fontWeight: "bold",
      fontFamily: options[0]?.fuente_global,
      fontSize: "12px",
      padding: "5px 10px",
    },
  };
  const valueSpan = {
    initial: {
      x: 0,
    },
    hover: {
      x: -10,
      color: "#fafafa",
    },
  };
  const valueIcon = {
    initial: {
      display: "none",
    },
    hover: {
      display: "block",
    },
  };

  return (
    <>
      {!isMobile ? (
        <>
          {!isLoading && options[0]?.activo_cookies === "si" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex justify-center w-screen"
            >
              <div className="flex flex-row z-[999] w-[550px] flex-wrap barra gap-3 items-center justify-start bg-[#fff] px-4 py-2  h-[65px] fixed bottom-[20px]">
                <div className="flex items-center h-full gap-3">
                  <motion.div
                    initial={{
                      scale: 0.1,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 9,
                      duration: 0.2,
                    }}
                    exit={{
                      scale: 0.1,
                    }}
                  >
                    <Image
                      height="30px"
                      width="30px"
                      objectFit="contain"
                      src="/cookies.png"
                      className="w-full"
                    ></Image>
                  </motion.div>

                  <span
                    style={{
                      fontFamily: options[0]?.fuente_global,
                      fontSize: "14px",
                    }}
                  >
                    {options[0]?.texto_cookies}
                  </span>
                </div>
                <motion.button
                  variants={valuesBoton}
                  initial="initial"
                  whileHover="hover"
                  onClick={() => handleClick()}
                >
                  <span style={{ fontFamily: options[0]?.fuente_global }}>
                    Aceptar
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <>
          {!isLoading && (
            <div className="flex flex-row left-[17%] z-[999] max-w-[300px] flex-wrap barra gap-3 items-center justify-start min-w-[300px] bg-[#fff] px-4 py-2  fixed bottom-[20px]">
              <div className="flex flex-col items-center w-full h-full">
                <motion.div
                  initial={{
                    scale: 0.1,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 9,
                    duration: 0.2,
                  }}
                  exit={{
                    scale: 0.1,
                  }}
                >
                  <Image
                    height="30px"
                    width="30px"
                    objectFit="contain"
                    src="/cookies.png"
                    className="w-full"
                  ></Image>
                </motion.div>
                <span
                  style={{
                    fontFamily: options[0]?.fuente_global,
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {options[0]?.texto_cookies}
                </span>
                <motion.button
                  variants={valuesBoton}
                  initial="initial"
                  whileHover="hover"
                  className="mt-4"
                  onClick={() => handleClick()}
                >
                  <span style={{ fontFamily: options[0]?.fuente_global }}>
                    Aceptar
                  </span>
                </motion.button>
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .barra {
          -webkit-box-shadow: 1px 1px 14px -4px rgba(0, 0, 0, 0.82);
          box-shadow: 1px 1px 14px -4px rgba(0, 0, 0, 0.82);
          border-radius: 30px;
        }
      `}</style>
    </>
  );
};
export default CookieAd;
