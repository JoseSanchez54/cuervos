import { useState } from "react";
import Link from "next/Link";
const ShopNav = ({ pagina, opciones }) => {
  const menuBruto = Object.values(pagina.menu_tienda).map((key) => {
    return key;
  });
  return (
    <>
      <div className="flex flex-row gap-5 justify-between my-9 w-full">
        {menuBruto.map((menu, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <Link href={`${menu.url}`}>
                <a>
                  <button>
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: opciones.fuente_global,
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      {menu.etiqueta}
                    </span>
                  </button>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ShopNav;
