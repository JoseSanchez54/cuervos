import dynamic from "next/dynamic";
const SingleGrid = dynamic(() => import("../components/SingleGrid"));
const Grid = ({ productos, opciones, max = 1000 }) => {
  return (
    <>
      {productos.map((producto, index) => {
        return (
          <>
            {index < max && (
              <SingleGrid key={index} producto={producto} opciones={opciones} />
            )}
          </>
        );
      })}
    </>
  );
};
export default Grid;
