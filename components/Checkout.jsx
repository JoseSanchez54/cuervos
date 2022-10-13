import dynamic from "next/dynamic";
import WooCommerce from "../woocommerce/Woocommerce";
import fetcherWc from "../utils/fetcherWc";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import validarEmail from "../utils/validarEmail";
import Link from "next/link";
const StripeCheckout = dynamic(() => import("./StripeCheckout"), {
  ssr: true,
});
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
const Checkbox = dynamic(() =>
  import("@nextui-org/react").then((mod) => mod.Checkbox)
);
const datosPaises = require("../utils/data.json");
const FormularioCheckout = ({ onAction, opciones }) => {
  const dispatch = useDispatch();
  const customers = useSWR("customers", fetcherWc);
  const usuario = useSelector((state) => state.userReducer);
  const userCustomer = customers?.data?.find(
    (order) =>
      order?.billing?.email === usuario.email && order.billing.email !== ""
  );
  const [tax, setTax] = useState({ tasa: "", error: false, mensaje: "" });
  const [estadoP, setEstadoP] = useState(onAction);
  const [cupon, setCupon] = useState("");
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(null);
  const [errorCupon, setErrorCupon] = useState(null);
  const actualCart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const taxes = useSelector((state) => state.cartReducer.taxes);
  const envios = useSelector((state) => state.cartReducer.envios);
  const peso = useSelector((state) => state.cartReducer.peso);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    pais: "",
    cp: "",
    provincia: "",
    nombreFacturacion: "",
    apellidoFacturacion: "",
    telefonoFacturacion: "",
    direccionFacturacion: "",
    ciudadFacturacion: "",
    paisFacturacion: "",
    cpFacturacion: "",
    total: total,
    cupon: cupon,
    signalId: "",
    facturacion: false,
  });

  /**
   * I'm trying to get the coupon code from the user and then check if it exists in the database and if
   * it's valid.
   */
  const getCupones = async (e) => {
    const fechaHoy = new Date();
    const codigo = e.target.value.toLowerCase();
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
      backgroundColor: "white",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      borderBottom: "1px solid black",
      color: "black",
      backgroundColor: "white",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "black";
      return { ...provided, opacity, color, transition };
    },
  };

  let precioEnvio = envios.find(
    (e) =>
      parseFloat(e.peso_maximo) >= peso && parseFloat(e.peso_minimo) <= peso
  );
  if (
    (total > 50 && formulario.provincia !== "TF") ||
    (total > 50 && formulario.provincia !== "GC") ||
    (total > 50 && formulario.provincia !== "PM")
  ) {
    precioEnvio.precio = 0;
  }
  if (
    formulario.provincia === "TF" ||
    formulario.provincia === "GC" ||
    formulario.provincia === "PM"
  ) {
    precioEnvio.precio = 20;
  }

  const [pais, setPais] = useState("");
  const [completo, setCompleto] = useState(false);

  const handleCheck = (e, nombre) => {
    setFormulario({
      ...formulario,
      [nombre]: e,
    });
  };
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
      first_name:
        formulario.nombreFacturacion !== ""
          ? formulario.nombreFacturacion
          : formulario.nombre,
      last_name: formulario.apellidoFacturacion
        ? formulario.apellidoFacturacion
        : formulario.apellido,
      address_1: formulario.direccionFacturacion
        ? formulario.direccionFacturacion
        : formulario.direccion,
      address_2: formulario.direccionFacturacion
        ? formulario.direccionFacturacion
        : formulario.direccion,
      city: formulario.ciudadFacturacion
        ? formulario.ciudadFacturacion
        : formulario.ciudad,
      state: formulario.provinciaFacturacion
        ? formulario.provinciaFacturacion
        : formulario.provincia,
      postcode: formulario.cpFacturacion
        ? formulario.cpFacturacion
        : formulario.cp,
      country: formulario.paisFacturacion
        ? formulario.paisFacturacion
        : formulario.pais,
      email: formulario.email,
      phone: formulario.telefono,
      coupon: cupon,
    },
    shipping: {
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
    meta_data: [
      {
        key: "codigoPais",
        value: formulario.pais,
      },
      {
        key: "codigoProvincia",
        value: formulario.provincia,
      },
    ],

    line_items: actualCart.map((item) => ({
      product_id: item.id,
      quantity: item.cantidad,
      variation_id: item?.variacion?.id,
    })),
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Gastos de envio",
        total:
          formulario.provincia === "GC" ||
          formulario.provincia === "TF" ||
          formulario.provincia === "PM"
            ? "20"
            : (total > 50 && formulario.provincia !== "GC") ||
              (total > 50 && formulario.provincia !== "TF") ||
              (total > 50 && formulario.provincia !== "PM")
            ? "0"
            : precioEnvio?.precio,
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
      if (input?.value === "" || politicas === false) {
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
      setError("");
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
      labelProvincia: e.label,
    });
    setPais({ ...pais, shortCodeProvincia: e.shortcode, provincia: e.label });
  };

  const handlePais = (e) => {
    setFormulario({
      ...formulario,
      pais: e.value,
      labelPais: e.label,
    });

    setPais({
      ...pais,
      valor: e.value,
      shortCode: e.shortCode,
      label: e.label,
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
  const totalDescontado =
    parseFloat(formulario.total) * parseFloat(cupon?.descuento);

  return (
    <>
      <div>
        {userCustomer && (
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
                  const metadata = Object?.values(userCustomer?.meta_data).map(
                    (key) => {
                      return key;
                    }
                  );
                  const codigoProvincia = metadata?.filter(
                    (m) => m.key === "codigoProvincia"
                  )[0]?.value;
                  const codigoPais = metadata?.filter(
                    (m) => m.key === "codigoPais"
                  )[0]?.value;
                  const provinciaLabel = datosPaises[0].regions.find(
                    (e) => e.shortCode === codigoProvincia
                  ).name;

                  setFormulario({
                    ...formulario,
                    nombreFacturacion: userCustomer.billing.first_name,
                    nombre: userCustomer.shipping.first_name,
                    apellidoFacturacion: userCustomer.billing.last_name,
                    apellido: userCustomer.shipping.last_name,
                    telefonoFacturacion: userCustomer.billing.phone,
                    telefono: userCustomer.shipping.phone,
                    direccionFacturacion: userCustomer.billing.address_1,
                    direccion: userCustomer.shipping.address_1,
                    cpFacturacion: userCustomer.billing.postcode,
                    cp: userCustomer.shipping.postcode,
                    paisFacturacion: codigoPais
                      ? codigoPais
                      : userCustomer.billing.country,
                    pais: userCustomer.shipping.country,
                    provinciaFacturacion: codigoProvincia
                      ? codigoProvincia
                      : userCustomer.billing.state,
                    provincia: userCustomer.shipping.state,
                    emailFacturacion: userCustomer.shipping.email,
                    email: userCustomer.shipping.email,
                    ciudadFacturacion: userCustomer.billing.city,
                    ciudad: userCustomer.shipping.city,
                    completo: true,
                    provinciaLabel: provinciaLabel,
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
                placeholder={"Nombre"}
                value={formulario.nombre}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="apellido"
                placeholder={"Apellidos"}
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
                placeholder={"Email"}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                placeholder={"Teléfono"}
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
                placeholder="Dirección"
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <Select
                placeholder={formulario.completo ? "España" : "País"}
                name="pais"
                options={optionsPais}
                onChange={(e) => handlePais(e)}
                styles={customStyles}
                isDisabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <Select
                placeholder={
                  formulario.completo ? formulario.provinciaLabel : "Provincia"
                }
                isDisabled={completo}
                name="provincia"
                styles={customStyles}
                options={arrt}
                onChange={(e) => handleProvincias(e)}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="ciudad"
                value={formulario.ciudad}
                placeholder={"Ciudad"}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
            <div className="flex flex-col w-full mx-2 md:w-1/2">
              <input
                type="text"
                name="cp"
                value={formulario.cp}
                placeholder={"Código postal"}
                onChange={(e) => handleFormulario(e)}
                disabled={completo}
              />
            </div>
          </div>
          <div className="flex flex-row fila">
            <div className="flex flex-col gap-5 z-0 w-full mx-2">
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
                name="facturacion"
                onChange={(e) => handleCheck(e, "facturacion")}
                isRequired={false}
                defaultSelected={false}
                size="xs"
              >
                Tengo una dirección de facturación diferente
              </Checkbox>
              {formulario.facturacion && (
                <>
                  {" "}
                  <div className="flex flex-row fila">
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <input
                        type="text"
                        name="nombreFacturacion"
                        placeholder={"Nombre"}
                        value={formulario.nombreFacturacion}
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <input
                        type="text"
                        name="apellidoFacturacion"
                        placeholder={"Apellidos"}
                        value={formulario.apellidoFacturacion}
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row fila">
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <input
                        type="email"
                        name="emailFacturacion"
                        value={formulario.emailFacturacion}
                        placeholder={"Email"}
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <input
                        type="tel"
                        name="telefonoFacturacion"
                        value={formulario.telefonoFacturacion}
                        placeholder={"Teléfono"}
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row fila">
                    <div className="flex flex-col w-full mx-2 ">
                      <input
                        type="text"
                        name="direccionFacturacion"
                        value={formulario.direccionFacturacion}
                        placeholder="Dirección"
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <Select
                        placeholder={formulario.completo ? "España" : "País"}
                        name="paisFacturacion"
                        options={optionsPais}
                        onChange={(e) => handlePais(e)}
                        styles={customStyles}
                        isDisabled={completo}
                      />
                    </div>
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <Select
                        placeholder={
                          formulario.completo
                            ? formulario.provinciaLabel
                            : "Provincia"
                        }
                        isDisabled={completo}
                        name="provinciaFacturacion"
                        styles={customStyles}
                        options={arrt}
                        onChange={(e) => handleProvincias(e)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row fila">
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <input
                        type="text"
                        name="ciudadFacturacion"
                        value={formulario.ciudadFacturacion}
                        placeholder={"Ciudad"}
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                    <div className="flex flex-col w-full mx-2 md:w-1/2">
                      <input
                        type="text"
                        name="cpFacturacion"
                        value={formulario.cpFacturacion}
                        placeholder={"Código postal"}
                        onChange={(e) => handleFormulario(e)}
                        disabled={completo}
                      />
                    </div>
                  </div>
                </>
              )}

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
                Acepto la
                <Link href="/legal/politica-de-privacidad">
                  <a
                    style={{
                      marginLeft: "2px",
                      marginRight: "2px",
                    }}
                  >
                    {" "}
                    {" política de privacidad"}
                  </a>
                </Link>
                {" y "}
                <Link href="/legal/aviso_legal">
                  <a style={{ marginLeft: "2px" }}>
                    {" "}
                    {" términos y condiciones"}
                  </a>
                </Link>
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
                        {formulario.provincia === "GC" ||
                        formulario.provincia === "TF" ||
                        formulario.provincia === "PM"
                          ? "20€"
                          : total > 50
                          ? "0€"
                          : precioEnvio?.precio}
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
                              ? parseFloat(formulario.total) -
                                totalDescontado +
                                "€"
                              : parseFloat(formulario.total) -
                                totalDescontado +
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
            {completo ? (
              <>
                <div className="flex items-center flex-col">
                  {" "}
                  <StripeCheckout
                    formulario={data}
                    envio={
                      formulario.provincia === "GC" ||
                      formulario.provincia === "TF" ||
                      formulario.provincia === "PM"
                        ? "20"
                        : total > 50
                        ? "0"
                        : precioEnvio?.precio
                    }
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
          margin-top: 20px;
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
