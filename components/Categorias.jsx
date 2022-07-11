import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/Nav"));
const ShopNav = dynamic(() => import("../components/ShopNav"));
const SingleGrid = dynamic(() => import("../components/SingleGrid"));
const Image = dynamic(() => import("next/image"));
const Categorias = ({ opciones, pagina, categorias, productos }) => {
  return (
    <>
      <Nav categorias={categorias} opciones={opciones} />
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-full items-center  max-w-[1212px] ">
          <div className="flex flex-row p-5 w-full">
            <span className="titulo uppercase">Tienda Online</span>
          </div>
          <div className="lg:flex flex-row p-5 hidden  w-full">
            <ShopNav opciones={opciones} pagina={pagina} />
          </div>

          <div className="flex flex-row flex-wrap  w-full">
            {productos.map((producto, index) => {
              return (
                <>
                  {index === 0 && (
                    <div className="flex flex-row  flex-wrap lg:flex-nowrap  w-full">
                      <div className="flex flex-col min-h-[200px] w-full lg:w-2/3">
                        <div className="relative p-3 w-full h-full justify-center items-center flex-col flex">
                          <span className="z-[20] uppercase text-center titulo2">
                            {pagina?.primer_titulo_tienda}
                          </span>
                          <Image
                            objectFit="cover"
                            layout="fill"
                            src={pagina?.banner_tienda}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-full lg:w-1/3">
                        <SingleGrid opciones={opciones} producto={producto} />
                      </div>
                    </div>
                  )}
                  {index > 0 && index < 7 && (
                    <SingleGrid
                      key={producto.id}
                      opciones={opciones}
                      producto={producto}
                    />
                  )}
                  {index === 6 && (
                    <div className="flex flex-row  flex-wrap lg:flex-nowrap  w-full">
                      <div className="flex flex-col min-h-[200px] w-full lg:w-2/3">
                        <div className="relative p-3 w-full h-full justify-center items-center flex-col flex">
                          <span className="z-[20] uppercase text-center titulo2">
                            {pagina?.segundo_titulo_tienda}
                          </span>
                          <Image
                            objectFit="cover"
                            layout="fill"
                            src={pagina?.banner_tienda_segundo}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-full lg:w-1/3">
                        <SingleGrid
                          opciones={opciones}
                          producto={productos[index + 1]}
                        />
                      </div>
                    </div>
                  )}
                  {index > 7 && (
                    <SingleGrid
                      key={producto.id}
                      opciones={opciones}
                      producto={producto}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .titulo {
          font-family: ${opciones.fuente_titulos};
          font-size: 36px;
        }
        .titulo2 {
          font-family: ${opciones.fuente_titulos};
          font-size: 55px;
          color: white;
        }
        @media (max-width: 1022px) {
          .titulo {
            font-family: ${opciones.fuente_titulos};
            font-size: 36px;
            line-height: 1.1;
          }

          .titulo2 {
            font-family: ${opciones.fuente_titulos};
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default Categorias;
