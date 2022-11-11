const Precio = ({
  precio,
  rebaja,
  hover,
  opciones,
  variable,
  variaciones,
  cat,
}) => {
  if (variaciones) {
    variaciones = variaciones.sort((a, b) => a.price - b.price);
  }

  return (
    <>
      {variaciones?.length < 1 ? (
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
                    {precio}€
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
                    {rebaja}€
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
      ) : (
        <>
          {variaciones !== undefined && (
            <>
              {cat === "destacados" ? (
                <>
                  {variaciones[0]?.sale_price ? (
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
                            {variaciones[0]?.regular_price / 2}€
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
                            {rebaja ? rebaja : variaciones[0]?.sale_price / 2}€
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
                            {precio ? precio : variaciones[0]?.price / 2}€
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {variaciones[0]?.sale_price ? (
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
                            {variaciones[0]?.regular_price}€
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
                            {variaciones[0]?.sale_price}€
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
                            {variaciones[0]?.price}€
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
export default Precio;
