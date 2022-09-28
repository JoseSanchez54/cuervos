import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));
const Link = dynamic(() => import("next/link"));
import { useOptions } from "../hooks/useOptions";
import { motion } from "framer-motion";
import useMobile from "../hooks/useMobile";
import { BiUser } from "react-icons/bi";
import MiniCart from "../components/MiniCart";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Nav = ({ opciones, categorias }) => {
  const router = useRouter();
  const { pathname } = router;
  const { options } = useOptions(opciones);
  const menuBruto = Object?.values(options?.menu_rep).map((key) => {
    return key;
  });
  const loguin = useSelector((state) => state.userReducer.login);
  const [login, setLogin] = useState(false);
  const handleLogin = () => {
    setLogin(!login);
  };
  const { isMobile } = useMobile();
  return (
    <>
      <div className="flex sticky top-0 bg-white pt-[8px] z-[30] flex-row w-full justify-between">
        <div className="flex flex-col w-1/3 h-auto items-start py-1 px-5 justify-center">
          {opciones?.logo_principal && (
            <Link href="/">
              <a>
                <Image
                  width="85px"
                  height="63px"
                  objectFit="contain"
                  src={opciones?.logo_principal}
                ></Image>
              </a>
            </Link>
          )}
        </div>
        <div className="flex flex-col w-1/3 items-center h-auto">
          <div className="flex flex-row w-full items-center h-full justify-between gap-5">
            {menuBruto.map((e) => {
              return (
                <Link passHref href={e?.enlace}>
                  <motion.a
                    initial={
                      pathname === e?.enlace
                        ? {
                            color: "#F7546C",
                            fontFamily: opciones?.fuente_global,
                            fontWeight: "bold",
                            paddingBottom: "5px",
                            borderBottom: "2px solid #F7546C",
                          }
                        : {
                            color: "#000000",
                            fontFamily: opciones?.fuente_global,
                            fontWeight: "bold",
                            borderBottom: "2px solid transparent",
                            paddingBottom: "5px",
                          }
                    }
                    whileHover={{
                      color: "#F7546C",
                      borderBottom: "2px solid #F7546C",
                    }}
                  >
                    {e.label}
                  </motion.a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-1/3 h-auto items-end py-1 px-5  justify-center">
          <div className="flex flex-row w-full gap-3 justify-end items-center">
            {!loguin ? (
              <>
                {!isMobile ? (
                  <motion.button
                    initial={{
                      fontFamily: opciones?.fuente_global,
                      color: "white",
                      backgroundColor: "#000000",
                      border: "1px solid #000000",
                      padding: "5px 10px",
                      borderRadius: "20%",
                    }}
                    whileHover={{
                      fontFamily: opciones?.fuente_global,
                      color: "black",
                      backgroundColor: "transparent",
                      border: "1px solid #000000",
                    }}
                    onClick={() => handleLogin()}
                  >
                    Entrar
                  </motion.button>
                ) : (
                  <button onClick={() => handleLogin()}>Mi cuenta</button>
                )}
              </>
            ) : (
              <Link href="/mi-cuenta" passHref>
                <motion.a
                  initial={{
                    fontFamily: opciones?.fuente_global,
                    color: "white",
                    backgroundColor: "#000000",
                    border: "1px solid #000000",
                    padding: "5px 10px",
                    borderRadius: "20%",
                  }}
                  whileHover={{
                    fontFamily: opciones?.fuente_global,
                    color: "black",
                    backgroundColor: "transparent",
                    border: "1px solid #000000",
                  }}
                >
                  Mi cuenta
                </motion.a>
              </Link>
            )}

            <MiniCart opciones={opciones} />
          </div>
        </div>
      </div>

      <LoginForm set={setLogin} login={login} opciones={opciones} />
    </>
  );
};
export default Nav;
