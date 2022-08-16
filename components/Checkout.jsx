import dynamic from "next/dynamic";
import StripeCheckout from "./StripeCheckout";
import WooCommerce from "../woocommerce/Woocommerce";
import { Checkbox } from "@nextui-org/react";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import fetcherWc from "../utils/fetcherWc";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const datosPaises = require("../utils/data.json");
const FormularioCheckout = ({ onAction, tasas, opciones, checkout }) => {
  const dispatch = useDispatch();
  const customers = useSWR("customers", fetcherWc);
  const usuario = useSelector((state) => state.userReducer);
  const userCustomer = customers?.data?.find(
    (order) => order?.billing?.email === usuario.email
  );

  const usuarioActual = {
    id: userCustomer?.id,
    nombre: userCustomer?.billing?.first_name,
    apellido: userCustomer?.billing?.last_name,
    nombreCompleto:
      userCustomer?.billing?.first_name +
      " " +
      userCustomer?.billing?.last_name,
    email: userCustomer?.billing?.email,
    telefono: userCustomer?.billing?.phone,
    direccion: userCustomer?.billing?.address_1,
    ciudad: userCustomer?.billing?.city,
    pais: userCustomer?.billing?.country,
    codigoPostal: userCustomer?.billing?.postcode,
  };
  const [cupon, setCupon] = useState(null);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(null);
  const [errorCupon, setErrorCupon] = useState(null);
  const getCupones = async (e) => {
    const fechaHoy = new Date();
    const codigo = e.target.value;
    if (e.target.value === "") {
      setCupon(null);
      setErrorCupon(null);
    } else {
      handleFormulario(e);
      const cupones = await WooCommerce.get("coupons")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      const cupon1 = await cupones.find((c) => c.code === codigo);
      const expira = await new Date(cupon1?.date_expires);
      if (!cupon1) {
        setErrorCupon("Cupón no encontrado");
        setCupon(null);
      } else {
        setErrorCupon(null);
        setCupon(cupon1);
      }
      if (fechaHoy > expira) {
        setCupon(null);
        setErrorCupon("El cupón ha expirado");
      } else {
        if (cupon1?.discount_type === "percent") {
          setCupon({
            ...cupon1,
            descuento: cupon1?.amount / 100,
            tipo: "porcentaje",
          });
        } else if (cupon1?.discount_type === "fixed_cart") {
          setCupon({
            ...cupon1,
            descuento: cupon1?.amount,
            tipo: "fijo",
          });
        }
      }
    }
  };

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
  function validarEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
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
    cupon: "",
  });
  const handleCheck = (e, nombre) => {
    setFormulario({
      ...formulario,
      [nombre]: e,
    });
  };
  const handleFormulario = (e) => {
    console.log(e.target.value);

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
      address_2: formulario.direccion,
      city: formulario.ciudad,
      state: formulario.provincia,
      postcode: formulario.cp,
      country: formulario.pais,
      email: formulario.email,
      phone: formulario.telefono,
      coupon: cupon,
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
        method_id: "flat_rate",
        method_title: "Gastos de envio",
        total: total > 50 ? "0" : precioEnvio?.precio,
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
      politicas,
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
      politicas,
    ];
    inputsArray.map((input) => {
      if (input.value === "" || politicas === false) {
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
      formulario.cp !== "" &&
      politicas.checked === true
    ) {
      setCompleto(true);
    } else if (!validarEmail(formulario.email)) {
      setCompleto(false);
      setError("Comprueba tu email");
    } else {
      setCompleto(false);
      setError("Por favor compruebe todos los campos");
      e.target.setAttribute("action", "");
    }
  };

  //Stripe

  const optionsPais = datosPaises.map((pais) => {
    return {
      value: pais.countryShortCode,
      label: pais.countryName,
      shortCode: pais.countryShortCode,
    };
  });
  let arrt = [];
  const optionsProvinciaT = datosPaises.filter(
    (p) => p.countryShortCode === pais.valor
  );
  const optionsProvincia = optionsProvinciaT.map((provincia) => {
    provincia.regions.map((p) => {
      arrt.push({
        value: p.shortCode,
        label: p.name,
        shortcode: p.shortCode,
      });
      return {
        value: p.shortCode,
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
        {userCustomer?.billing.first_name !== "" && (
          <>
            <div className="flex bg-black py-5 px-3 items-center flex-row gap-5 w-full">
              <span
                style={{
                  fontFamily: opciones.fuente_global,
                  color: "white",
                }}
              >
                ¿Quieres usar tu direccion anterior?
              </span>

              <button
                style={{
                  fontFamily: opciones.fuente_global,
                  color: "white",
                  border: "solid 1px white",
                  padding: "10px 20px",
                }}
                onClick={() => {
                  setFormulario({
                    ...formulario,
                    nombre: usuarioActual.nombre,
                    apellido: usuarioActual.apellido,
                    telefono: usuarioActual.telefono,
                    direccion: usuarioActual.direccion,
                    cp: usuarioActual.codigoPostal,
                    pais: usuarioActual.pais,
                    provincia: usuarioActual.provincia,
                    email: usuarioActual.email,
                    ciudad: usuarioActual.ciudad,
                  });
                  setCompleto(true);
                }}
              >
                Rellenar
              </button>
            </div>
          </>
        )}

        <form onSubmit={(e) => actionForm(e)} method="post" target="_blank">
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="nombre"
                placeholder={
                  userCustomer?.billing.first_name
                    ? userCustomer?.billing.first_name
                    : "Nombre"
                }
                value={formulario.nombre}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="apellido"
                placeholder={
                  userCustomer?.billing.last_name
                    ? userCustomer?.billing.last_name
                    : "Apellidos"
                }
                value={formulario.apellido}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="email"
                name="email"
                value={formulario.email}
                placeholder={usuario?.email ? usuario?.email : "Email"}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                placeholder={
                  userCustomer?.billing.phone
                    ? userCustomer?.billing.phone
                    : "Teléfono"
                }
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 ">
              <input
                type="text"
                name="direccion"
                value={formulario.direccion}
                placeholder={
                  userCustomer?.billing.address_1
                    ? userCustomer?.billing.address_1
                    : "Dirección"
                }
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <Select
                placeholder={
                  userCustomer?.billing.country
                    ? userCustomer?.billing.country
                    : "País"
                }
                name="pais"
                value={formulario.pais}
                options={optionsPais}
                onChange={handlePais}
                styles={customStyles}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <Select
                inputValue={formulario.provincia}
                placeholder={
                  userCustomer?.billing.state
                    ? userCustomer?.billing.state
                    : "Provincia"
                }
                isDisabled={completo}
                name="provincia"
                value={formulario.provincia}
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
                value={formulario.ciudad}
                placeholder={
                  userCustomer?.billing.city
                    ? userCustomer?.billing.city
                    : "Ciudad"
                }
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="cp"
                value={formulario.cp}
                placeholder={
                  userCustomer?.billing.postcode
                    ? userCustomer?.billing.postcode
                    : "Código postal"
                }
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col gap-5 w-full mx-2">
              <input
                type="text"
                name="cupon"
                placeholder="Cupon"
                onChange={(e) => getCupones(e)}
                disabled={completo}
              />
              <Checkbox
                css={{
                  span: {
                    fontFamily: opciones?.fuente_global,
                  },
                }}
                name="comerciales"
                onChange={(e) => handleCheck(e, "comerciales")}
                isRequired={true}
                defaultSelected={false}
                size="xs"
              >
                Acepto recibir comunicaciones comerciales
              </Checkbox>
              <Checkbox
                css={{
                  span: {
                    fontFamily: opciones?.fuente_global,
                  },
                }}
                name="politicas"
                onChange={(e) => handleCheck(e, "politicas")}
                isRequired={true}
                defaultSelected={false}
                size="xs"
              >
                Acepto la política de privacidad y los términos y condiciones
              </Checkbox>
              {cupon === null && errorCupon !== null && (
                <span
                  style={{
                    fontFamily: opciones?.fuente_global,
                    color: "red",
                  }}
                  className="error"
                >
                  {errorCupon}
                </span>
              )}
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
                      <span className="subtotal">+{iva}€</span>
                    </div>
                  </div>
                  {cupon && (
                    <>
                      <div
                        key="cupones"
                        className="flex flex-row w-full pb-2 mt-5 border-b-2 individualTax"
                      >
                        <div className="flex flex-col w-1/2">
                          <span className="subtotal">Cupon</span>
                        </div>
                        <div className="flex flex-col items-end w-1/2">
                          <span className="subtotal">
                            {cupon?.tipo === "porcentaje"
                              ? "-" + cupon.descuento * 100 + "%"
                              : "-" + cupon.descuento + "€"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex flex-row w-full pb-2 mt-5 border-b-2 individualTax">
                    <div className="flex flex-col w-1/2">
                      <span className="subtotal">Envío:</span>
                    </div>
                    <div className="flex flex-col items-end w-1/2">
                      <span className="subtotal">
                        +
                        {total > 50
                          ? "0€ (Envio gratuito)"
                          : precioEnvio?.precio + "€"}
                      </span>
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
                    {cupon ? (
                      <>
                        {cupon?.tipo === "porcentaje" ? (
                          <>
                            {tax.tasa === ""
                              ? parseFloat(formulario.total) *
                                  parseFloat(cupon?.descuento) +
                                "€"
                              : parseFloat(formulario.total) *
                                  parseFloat(cupon?.descuento) +
                                parseFloat(precioEnvio.precio) +
                                "€"}
                          </>
                        ) : (
                          <>
                            {cupon && tax.tasa === ""
                              ? parseFloat(formulario.total) -
                                parseInt(cupon?.descuento) +
                                "€"
                              : parseFloat(formulario.total) -
                                parseInt(cupon?.descuento) +
                                parseFloat(precioEnvio.precio) +
                                "€"}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {tax.tasa === ""
                          ? parseFloat(formulario.total) + "€"
                          : parseFloat(formulario.total) +
                            parseFloat(precioEnvio.precio) +
                            "€"}
                      </>
                    )}
                  </span>
                </div>
              </div>
              {error && (
                <>
                  {" "}
                  <span
                    style={{
                      fontFamily: opciones?.fuente_global,
                      color: "red",
                    }}
                    className="error my-5"
                  >
                    {error}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-row w-full justify-center mt-5">
            {completo && !tax.error ? (
              <>
                <div className="flex items-center flex-col">
                  {" "}
                  <StripeCheckout
                    formulario={data}
                    envio={total > 50 ? "0" : precioEnvio.precio}
                    cupon={cupon}
                  />
                  <button
                    style={{
                      fontFamily: opciones?.fuente_global,
                      textDecoration: "underline",
                    }}
                    className="mt-6"
                    onClick={() => setCompleto(false)}
                  >
                    Volver a editar los datos
                  </button>
                </div>
              </>
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
          color: #000;
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
          color: black;
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
