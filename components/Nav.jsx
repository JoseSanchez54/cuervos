import dynamic from "next/dynamic";
const FranjaPromo = dynamic(() => import("../components/FranjaPromo"));
const Image = dynamic(() => import("next/image"));
const Link = dynamic(() => import("next/link"));
const MenuLateral = dynamic(() => import("../components/MenuLateral"));
import useMobile from "../hooks/useMobile";
import { BiUser } from "react-icons/bi";
import MiniCart from "../components/MiniCart";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

const Nav = ({ opciones, categorias }) => {
  const loguin = useUser();

  const [login, setLogin] = useState(loguin);
  const handleLogin = () => {
    setLogin(!login);
  };
  const { isMobile } = useMobile();
  return (
    <>
      <FranjaPromo opciones={opciones} />
      <div className="flex sticky top-0 bg-white pt-[8px] z-[30] flex-row w-full justify-between  my-4">
        <div className="flex flex-col w-1/3 h-auto items-start py-1 px-5 justify-center">
          <MenuLateral categorias={categorias} opciones={opciones} />
        </div>
        <div className="flex flex-col w-1/3 items-center h-auto">
          <Link href="/">
            <a>
              <Image
                width="85px"
                height="63px"
                src={opciones.logo_principal}
              ></Image>
            </a>
          </Link>
        </div>
        <div className="flex flex-col w-1/3 h-auto items-end py-1 px-5  justify-center">
          <div className="flex flex-row w-full gap-3 justify-end items-center">
            {!loguin ? (
              <>
                {!isMobile ? (
                  <button
                    style={{
                      fontFamily: opciones.fuente_global,
                      color: "black",
                    }}
                    onClick={() => handleLogin()}
                  >
                    Tu cuenta
                  </button>
                ) : (
                  <button onClick={() => handleLogin()}>
                    <BiUser size="25px" />
                  </button>
                )}
              </>
            ) : (
              <Link href="/mi-cuenta" passHref>
                <a
                  style={{
                    fontFamily: opciones.fuente_global,
                    color: "black",
                  }}
                >
                  Mi cuenta
                </a>
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
