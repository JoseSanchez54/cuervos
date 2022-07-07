import dynamic from "next/dynamic";
const SingleGrid = dynamic(() => import("../components/SingleGrid"));
const Grid = ({ productos, opciones }) => {
  return (
    <>
      {productos.map((producto, index) => {
        return (
          <SingleGrid key={index} producto={producto} opciones={opciones} />
        );
      })}
    </>
  );
};
export default Grid;
