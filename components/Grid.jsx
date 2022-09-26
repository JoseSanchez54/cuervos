import dynamic from "next/dynamic";
const SingleGrid = dynamic(() => import("../components/SingleGrid"));
const SingleGridConfig = dynamic(() =>
  import("../components/SingleGridConfig")
);
const Grid = ({ productos, opciones, max = 1000, config }) => {
  return (
    <>
      {productos.map((producto, index) => {
        return (
          <>
            {index < max && (
              <div
                className="flex flex-col gap-2 z-[21] w-full h-[508px] max-h-[508px]  max-w-[404px]"
                key={producto.id}
              >
                {config === true ? (
                  <SingleGridConfig producto={producto} opciones={opciones} />
                ) : (
                  <SingleGrid
                    producto={producto}
                    opciones={opciones}
                    config={config}
                  />
                )}
              </div>
            )}
          </>
        );
      })}
    </>
  );
};
export default Grid;
