import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const ShopNav = ({ pagina, opciones }) => {
  const router = useRouter();

  const [activo, setActivo] = useState("");

  useEffect(() => {
    setActivo(router.query.categoria);
  }, [router]);
  const menuBruto = Object.values(pagina.menu_tienda).map((key) => {
    return key;
  });
  return (
    <>
      <div className="flex flex-row gap-5 justify-between my-9 w-full">
        {menuBruto.map((menu, index) => {
          return (
            <div className="flex flex-col" key={index}>
              <Link href={`/categoria${menu.url}`}>
                <a>
                  <button>
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: opciones.fuente_global,
                        fontSize: "16px",
                        color: "black",
                        textDecoration:
                          "/" + activo === menu.url ? "underline" : "none",
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
