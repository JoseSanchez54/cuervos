import { Input } from "@nextui-org/react";
import { useState } from "react";
import { GrClose } from "react-icons/gr/";
import WooCommerce from "../woocommerce/Woocommerce";
const UserForm = ({ opciones, usuario }) => {
  const [activo, setActivo] = useState(false);
  const [form, setForm] = useState({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    telefono: usuario.telefono,
    direccion: usuario.direccion,
    ciudad: usuario.ciudad,
    pais: usuario.pais,
    cp: usuario.codigoPostal,
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleActivo = () => {
    setActivo(!activo);
  };
  const handleEnviar = async (e) => {
    e.preventDefault;
    setForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      ciudad: usuario.ciudad,
      pais: usuario.pais,
      cp: usuario.codigoPostal,
    });
    const data = {
      billing: {
        first_name: form.nombre,
        last_name: form.apellido,
        email: form.email,
        phone: form.telefono,
        address_1: form.direccion,
        city: form.ciudad,
        state: form.pais,
        postcode: form.cp,
      },
      first_name: form.nombre,
      last_name: form.apellido,
      email: form.email,
    };
    console.log(data);

    await WooCommerce.put("customers/" + usuario.id, data)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  return (
    <>
      {activo && (
        <>
          <div className="flex fixed top-0 right-0 left-0 bottom-0 flex-row w-screen h-screen justify-center items-center">
            <div className="flex max-w-[700px] gap-5 py-9 px-9 bg-white flex-col w-full items-center">
              <div className="flex mb-9 w-full flex-row justify-between">
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#000",
                    fontFamily: opciones.fuente_global,
                  }}
                >
                  Editar Perfil
                </span>
                <button onClick={() => handleActivo()}>
                  <GrClose size="15px" />
                </button>
              </div>

              <div className="flex my-8 flex-row gap-5 w-full">
                <div className="flex flex-col w-1/2">
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Nombre"
                    name="nombre"
                    initialValue={usuario.nombre}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  {" "}
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Apellido"
                    name="apellido"
                    initialValue={usuario.apellido}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex my-8 flex-row gap-5 w-full">
                <div className="flex flex-col w-1/2">
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Email"
                    name="email"
                    initialValue={usuario.email}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  {" "}
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Teléfono"
                    name="telefono"
                    initialValue={usuario.telefono}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex my-8 flex-row gap-5 w-full">
                <div className="flex flex-col w-1/2">
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Dirección"
                    name="direccion"
                    initialValue={usuario.direccion}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Código postal"
                    name="cp"
                    initialValue={usuario.codigoPostal}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex my-8 flex-row gap-5 w-full">
                <div className="flex flex-col w-1/2">
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="País"
                    name="pais"
                    initialValue={usuario.pais}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <Input
                    onChange={(e) => handleForm(e)}
                    clearable
                    labelPlaceholder="Ciudad"
                    name="ciudad"
                    initialValue={usuario.ciudad}
                    required
                    css={{
                      backgroundColor: "white",
                      borderColor: "#7e8085",
                      fontFamily: opciones.fuente_global,
                      borderRadius: "0",
                      label: {
                        color: "#7e8085",
                        zIndex: "1",
                      },
                      input: {
                        borderColor: "#7e8085",
                        borderRadius: "0",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full justify-center">
                <button
                  onClick={(e) => handleEnviar(e)}
                  className="botoncuenta"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => handleActivo()}
        key="cuenta"
        className="botoncuenta px-[20px] py-[10px]"
      >
        Editar perfil
      </button>

      <style jsx>{`
        button.botoncuenta {
          padding: 10px 20px !important;
          background-color: white;
          color: black;
          border: 1px solid black;
          font-family: ${opciones.fuente_global};
        }
        button.botoncuenta:hover {
          background-color: black;
          color: white;
        }
      `}</style>
    </>
  );
};
export default UserForm;
