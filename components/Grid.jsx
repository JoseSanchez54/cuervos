import dynamic from "next/dynamic";
const SingleGrid = dynamic(() => import("../components/SingleGrid"));
const Grid = ({ productos, opciones, max = 1000 }) => {
  return (
    <>
      {productos.map((producto, index) => {
        return (
          <>
            {index < max && (
              <div
                className="flex flex-col z-[21] w-full h-[508px] max-h-[508px]  max-w-[404px]"
                key={producto.id}
              >
                <SingleGrid producto={producto} opciones={opciones} />
              </div>
            )}
          </>
        );
      })}
    </>
  );
};
export default Grid;
