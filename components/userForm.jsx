import { Input } from "@nextui-org/react";
import { useState } from "react";
const UserForm = ({ opciones }) => {
  const [activo, setActivo] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    olvidado: "",
    code: "",
    email: "",
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
  return (
    <>
      {activo ? (
        <>
          <div className="flex flex-row w-full justify-center items-center">
            <div className="flexmax-w-[500px] bg-white flex-col w-full items-center">
              <form>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col w-1/2">
                    <Input
                      clearable
                      labelPlaceholder="Nombre"
                      initialValue="Nombre"
                      name="nombre"
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
                      clearable
                      labelPlaceholder="Apellido"
                      initialValue="Apellido"
                      name="apellido"
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
              </form>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => handleActivo()}
          key="cuenta"
          className="botoncuenta px-[20px] py-[10px]"
        >
          Editar perfil
        </button>
      )}
      <style jsx>{`
        button.botoncuenta {
          padding: 10px 20px !important;
          background-color: white;
          color: black;
          border: 1px solid black;
          font-family: ${opciones.fuente_global};
        }
        button:hover {
          background-color: black;
          color: white;
        }
      `}</style>
    </>
  );
};
export default UserForm;
