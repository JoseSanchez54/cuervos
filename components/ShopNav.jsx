import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useOptions } from "../hooks/useOptions";
const ShopNav = ({ pagina, opciones }) => {
  const { options } = useOptions(opciones);
  const router = useRouter();

  const [activo, setActivo] = useState("");

  useEffect(() => {
    setActivo(router.query.categoria);
  }, [router]);
  let menuBruto = "";
  if (pagina) {
    menuBruto = Object?.values(pagina?.menu_tienda).map((key) => {
      return key;
    });
  }

  return (
    <>
      <div className="flex flex-row gap-5 justify-between my-9 w-full">
        {pagina &&
          menuBruto?.map((menu, index) => {
            return (
              <div className="flex flex-col" key={index}>
                <Link href={`/categoria${menu.url}`} passHref>
                  <a>
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: options?.fuente_global,
                        fontSize: "16px",
                        color: "black",
                        textDecoration:
                          "/" + activo === menu.url ? "underline" : "none",
                      }}
                    >
                      {menu.etiqueta}
                    </span>
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
