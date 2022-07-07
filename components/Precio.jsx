const Precio = ({ precio, rebaja, hover, opciones }) => {
  return (
    <>
      {rebaja ? (
        <>
          <div className="flex gap-2 z-[11] flex-row w-full">
            <div className="flex flex-col">
              <span
                style={{
                  color: hover ? "white" : "black",
                  fontFamily: opciones.fuente_global,
                  textDecoration: "line-through",
                }}
                className="rebaja"
              >
                {rebaja}€
              </span>
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  color: hover ? "white" : "black",
                  fontFamily: opciones.fuente_global,
                }}
                className="rebaja"
              >
                {precio}€
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex  z-[11] flex-row w-full">
            <div className="flex flex-col">
              <span
                style={{
                  color: hover ? "white" : "black",
                  fontFamily: opciones.fuente_global,
                }}
                className="rebaja"
              >
                {precio}€
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Precio;
