import dynamic from "next/dynamic";
import StripeCheckout from "./StripeCheckout";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const datosPaises = require("../utils/data.json");
const FormularioCheckout = ({ onAction, tasas, opciones, checkout }) => {
  const [tax, setTax] = useState({ tasa: "", error: false, mensaje: "" });
  const [estadoP, setEstadoP] = useState(onAction);
  const handleEstado = () => {
    setEstadoP(!estadoP);
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused && "black",
      color: state.isFocused && "white",
    }),
    menuList: (provided, state) => ({
      ...provided,
      width: "100%",
      maxHeight: "200px",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      borderBottom: "1px solid black",
      color: "black",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "black";
      return { ...provided, opacity, color, transition };
    },
  };

  const actualCart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const taxes = useSelector((state) => state.cartReducer.taxes);
  const envios = useSelector((state) => state.cartReducer.envios);
  const peso = useSelector((state) => state.cartReducer.peso);
  const precioEnvio = envios.find(
    (e) =>
      parseFloat(e.peso_maximo) >= peso && parseFloat(e.peso_minimo) <= peso
  );

  const [pais, setPais] = useState("");
  const [completo, setCompleto] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    pais: "",
    cp: "",
    total: total,
  });
  const handleFormulario = (e) => {
    if (e.target.value === "") {
      e.target.classList.add("error");
      setFormulario({
        ...formulario,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormulario({
        ...formulario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const data = {
    payment_method: "Stripe Cría Cuervos",
    payment_method_title: "Stripe",
    set_paid: false,
    billing: {
      first_name: formulario.nombre,
      last_name: formulario.apellido,
      address_1: formulario.direccion,
      address_2: formulario.numeroCalle,
      city: formulario.ciudad,
      state: formulario.provincia,
      postcode: formulario.cp,
      country: formulario.pais,
      email: formulario.email,
      phone: formulario.telefono,
    },
    shipping: {
      first_name: formulario.nombre,
      last_name: formulario.apellido,
      address_1: formulario.direccion,
      city: formulario.ciudad,
      state: formulario.provincia,
      postcode: formulario.codigoPostal,
      country: formulario.pais,
    },

    line_items: actualCart.map((item) => ({
      product_id: item.id,
      quantity: item.cantidad,
      variation_id: item?.variacion?.id,
    })),
    shipping_lines: [
      {
        method_id: 6,
        method_title: "Paq Premium Domicilio",
        total: precioEnvio?.precio,
      },
    ],
  };

  const actionForm = (e) => {
    e.preventDefault();
    const {
      telefono,
      email,
      nombre,
      apellido,
      direccion,
      ciudad,
      provincia,
      cp,
      pais,
    } = e.target;
    const inputsArray = [
      telefono,
      email,
      nombre,
      apellido,
      direccion,
      ciudad,
      provincia,
      cp,
      pais,
    ];
    inputsArray.map((input) => {
      if (input.value === "") {
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
    if (
      formulario.nombre !== "" &&
      formulario.apellido !== "" &&
      formulario.email !== "" &&
      formulario.telefono !== "" &&
      formulario.direccion !== "" &&
      formulario.ciudad !== "" &&
      formulario.provincia !== "" &&
      formulario.cp !== ""
    ) {
      setCompleto(true);
    } else {
      setCompleto(false);
      e.target.setAttribute("action", "");
    }
  };

  //Stripe

  const optionsPais = datosPaises.map((pais) => {
    return {
      value: pais.countryName,
      label: pais.countryName,
      shortCode: pais.countryShortCode,
    };
  });
  let arrt = [];
  const optionsProvinciaT = datosPaises.filter(
    (p) => p.countryName === pais.valor
  );
  const optionsProvincia = optionsProvinciaT.map((provincia) => {
    provincia.regions.map((p) => {
      arrt.push({
        value: p.name,
        label: p.name,
        shortcode: p.shortCode,
      });
      return {
        value: p.name,
        label: p.name,
        shortcode: p.shortCode,
      };
    });
  });

  const handleProvincias = (e) => {
    setFormulario({
      ...formulario,
      provincia: e.value,
    });
    setPais({ ...pais, shortCodeProvincia: e.shortcode });
  };

  const handlePais = (e) => {
    setFormulario({
      ...formulario,
      pais: e.value,
    });

    setPais({
      ...pais,
      valor: e.value,
      shortCode: e.shortCode,
    });
  };
  const tasa = taxes.find((e) => e.country === pais.shortCode);
  const subtotal = "";
  const iva2 = "";
  const iva = "";
  if (tasa) {
    const bueno = tasa.rate.split(".");
    iva2 = formulario.total * (bueno[0] / 100).toFixed(2);
    subtotal = formulario.total - formulario.total * (bueno[0] / 100);
    iva = iva2.toFixed(2);
  }
  useEffect(() => {
    if (tasa) {
      const bueno = tasa.rate.split(".");
      const iva2 = formulario.total * (bueno[0] / 100);
      const iva = iva2.toFixed(2);

      subtotal = formulario.total - formulario.total * (bueno[0] / 100);

      setTax({ tasa: bueno[0], error: false, mensaje: "" });
    } else {
      setTax({
        ...tax,
        error: true,
        mensaje: "Actualmente no enviamos a tu pais",
      });
    }
  }, [pais]);

  return (
    <>
      <div>
        <form onSubmit={(e) => actionForm(e)} method="post" target="_blank">
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="apellido"
                placeholder="Apellidos"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 ">
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <Select
                placeholder="Pais"
                name="pais"
                options={optionsPais}
                onChange={handlePais}
                styles={customStyles}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <Select
                placeholder="Provincia"
                name="provincia"
                styles={customStyles}
                options={arrt}
                onChange={handleProvincias}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="cp"
                placeholder="CP"
                onChange={(e) => handleFormulario(e)}
              />
            </div>
          </div>

          <div className="flex flex-row taxes">
            <div className="flex flex-col w-full mx-2 scroll">
              {pais.valor && (
                <span className="errorMessage">{tax.mensaje}</span>
              )}
              {tax.tasa !== "" && (
                <>
                  {" "}
                  <div className="flex flex-row w-full mt-5 individualTax">
                    <div className="flex flex-col w-1/2">
                      <span className="subtotal">Subtotal:</span>
                    </div>
                    <div className="flex flex-col items-end w-1/2">
                      <span className="subtotal">{subtotal}€</span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full pb-2 mt-5 individualTax">
                    <div className="flex flex-col w-1/2">
                      <span className="subtotal">
                        Impuestos:
                        <span className="peque"> ({tax.tasa + "% I.V.A"})</span>
                      </span>
                    </div>
                    <div className="flex flex-col items-end w-1/2">
                      <span className="subtotal">{iva}€</span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full pb-2 mt-5 border-b-2 individualTax">
                    <div className="flex flex-col w-1/2">
                      <span className="subtotal">Envío:</span>
                    </div>
                    <div className="flex flex-col items-end w-1/2">
                      <span className="subtotal">{precioEnvio?.precio}€</span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-row w-full mt-5 individualTax">
                <div className="flex flex-col w-1/2">
                  <span className="subtotal">Total:</span>
                </div>
                <div className="flex flex-col items-end w-1/2">
                  <span className="subtotal">
                    {tax.tasa === ""
                      ? parseFloat(formulario.total) + "€"
                      : parseFloat(formulario.total) +
                        parseFloat(precioEnvio.precio) +
                        "€"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full justify-center mt-5">
            {completo && !tax.error ? (
              <StripeCheckout formulario={data} envio={precioEnvio.precio} />
            ) : (
              <input
                className="botonForm mt-9"
                type="submit"
                value="Continuar"
              />
            )}
          </div>
        </form>

        <div className="flex flex-row justify-center mt-2 mb-9">
          <button className="atras" onClick={onAction}>
            Volver atrás
          </button>
        </div>
      </div>

      <style jsx>{`
        .botonForm {
          font-family: "Helvetica";
          color: #fff;
          font-size: 25px;
          background-color: black;
          padding: 10px 20px;
          cursor: pointer;
          text-align: center;
        }
        .botonForm:hover {
          color: #000;
          background-color: #fff;
          border: 2px solid #000;
        }
        span {
          color: #000;
        }
        .atras {
          color: #fff;
          text-decoration: underline;
          text-align: center;
        }
        .errorMessage {
          color: red;
          font-size: 12px;
          font-family: "Helvetica";
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"] {
          width: 100%;
          padding: 10px;
          background-color: transparent;
          border-bottom: 1px solid white;
          margin: 10px 0px;
          color: white;
        }
        .individualTax {
          color: white;
          font-size: 14px;
          font-family: "Helvetica";
        }
        .peque {
          font-size: 11px;
        }
        .error {
          border-bottom: 2px solid red !important;
        }
      `}</style>
    </>
  );
};
export default FormularioCheckout;
