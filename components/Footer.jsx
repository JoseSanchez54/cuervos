import Link from "next/link";
const Footer = ({ options }) => {
  const menuBruto = Object.values(options.menu_footer).map((key) => {
    return key;
  });
  return (
    <div className="flex flex-row bg-[#FAFAFA] p-7 justify-center w-full">
      <div className="flex flex-col max-w-[1212px] items-center w-full">
        <div className="lg:flex hidden flex-row justify-between w-full">
          {menuBruto.map((e) => {
            return (
              <>
                <div className="flex flex-col ">
                  <Link href={e.enlace} passHref>
                    <a>
                      <button
                        style={{
                          fontFamily: options.fuente_global,
                          fontSize: "12px",
                          textTransform: "uppercase",
                          color: "black",
                        }}
                      >
                        <span>{e.label}</span>
                      </button>
                    </a>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col  w-full lg:w-1/2"></div>
          <div className="flex flex-col  w-full lg:w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
