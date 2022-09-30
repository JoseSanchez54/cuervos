import dynamic from "next/dynamic";
const SingleGrid = dynamic(() => import("./SingleGrid"));
import useMobile from "../hooks/useMobile";
const OfertaSlider = dynamic(() => import("./OfertaSlider"));
const Grid = ({ productos, opciones, max = 1000 }) => {
  const { isMobile } = useMobile();
  return (
    <>
      {isMobile ? (
        <>
          <div className="contents">
            <OfertaSlider productos={productos} opciones={opciones} />
          </div>
        </>
      ) : (
        <>
          {productos.map((producto, index) => {
            console.log(producto);
            return (
              <>
                {index < max && (
                  <>
                    <div
                      className="flex flex-col gap-2 z-[21] w-full   max-w-[232px]"
                      key={producto.id}
                    >
                      <SingleGrid
                        producto={producto}
                        opciones={opciones}
                        oferta={true}
                      />
                    </div>
                  </>
                )}
              </>
            );
          })}
        </>
      )}
    </>
  );
};
export default Grid;
