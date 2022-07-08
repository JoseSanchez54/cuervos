import dynamic from "next/dynamic";
const FranjaPromo = dynamic(() => import("../components/FranjaPromo"));
const Image = dynamic(() => import("next/image"));
const Link = dynamic(() => import("next/link"));
const MenuLateral = dynamic(() => import("../components/MenuLateral"));
import useMobile from "../hooks/useMobile";
import { IoIosCart } from "react-icons/io";
import { BiUser } from "react-icons/bi";

const Nav = ({ opciones, categorias }) => {
  const { isMobile } = useMobile();
  return (
    <>
      <FranjaPromo opciones={opciones} />
      <div className="flex flex-row w-full justify-between  my-4">
        <div className="flex flex-col w-1/3 h-auto items-start p-1  justify-center">
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
        <div className="flex flex-col w-1/3 h-auto items-end p-1  justify-center">
          <div className="flex flex-row w-full gap-3 justify-end items-center">
            {!isMobile ? (
              <Link href="#">
                <a
                  style={{ color: "black", fontFamily: opciones.fuente_global }}
                >
                  Tu cuenta
                </a>
              </Link>
            ) : (
              <Link href="#">
                <BiUser size="25px" />
              </Link>
            )}
            <IoIosCart size="25px" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
