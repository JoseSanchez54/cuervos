import dynamic from "next/dynamic";
const Marquee = dynamic(() => import("react-fast-marquee"));
const FranjaPromo = ({ opciones }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: opciones.promocion_color_fondo,
          color: opciones.promocion_color_texto,
          fontFamily: opciones.fuente_titulos,
        }}
        className="flex flex-row w-full h-[75px]"
      >
        <Marquee gradient={false}>
          <span className="marquesina">{opciones.promocion_uno}</span>
          <span className="marquesina">{opciones.promocion_dos}</span>
          <span className="marquesina">{opciones.promocion_uno}</span>
          <span className="marquesina">{opciones.promocion_dos}</span>
          <span className="marquesina">{opciones.promocion_uno}</span>
          <span className="marquesina">{opciones.promocion_dos}</span>
        </Marquee>
      </div>
      <style jsx>{`
        .marquesina {
          margin: 0px 250px;
          font-size: 16px;
        }
        @media (max-width: 1000px) {
          .marquesina {
            margin: 0px 30px;
          }
        }
      `}</style>
    </>
  );
};
export default FranjaPromo;
