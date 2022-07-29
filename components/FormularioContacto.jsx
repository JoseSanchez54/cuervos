import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import useMobile from "../hooks/useMobile";
import { Input, Textarea, Checkbox } from "@nextui-org/react";

const FormularioContacto = ({ options }) => {
  const mailCentral = options.email;
  const { isMobile } = useMobile();
  const [enviado, setEnviado] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");
  const [name, setName] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    asunto: "",
  });
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      if (
        i.type === "image/png" ||
        i.type === "image/jpeg" ||
        i.type === "application/pdf"
      ) {
        setImage(i);
        setName(i.name);
        setCreateObjectURL(URL.createObjectURL(i));
        const code = getBase64(i);
      } else {
        setMensaje("El archivo debe de ser .jpg, .png o .pdf");
        setEnviado(false);
      }
    }
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  async function enviar(e) {
    e.preventDefault();
    let mensaje = "";

    if (!form.nombre || !form.email || !form.mensaje) {
      mensaje = "Todos los campos son obligatorios";
      setMensaje(mensaje);
    } else {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("email", form.email);
      formData.append("mensaje", form.mensaje);
      formData.append("asunto", form.asunto);
      formData.append("emailcentral", mailCentral);

      await axios
        .post(process.env.URLBASE + "/wp-json/wp/v2/sendermail", formData)
        .then((response) => {
          if (response.data === true) {
            setEnviado(true);
          }
        });
    }
  }

  return (
    <>
      {enviado === false ? (
        <>
          <form className="w-full h-max" onSubmit={enviar}>
            <div className="flex flex-row gap-5 flex-wrap w-full lg:flex-nowrap px-3 ">
              <div className="flex flex-col gap-8 lg:gap-9 justify-between max-h-[123px] w-full  h-full ">
                <Input
                  clearable
                  bordered
                  labelPlaceholder="Nombre"
                  initialValue="Nombre"
                  onChange={(e) => handleForm(e)}
                  name="nombre"
                  value={form.nombre}
                  required
                  css={{
                    backgroundColor: "white",
                    borderColor: "#7e8085",
                    label: {
                      color: "#7e8085",
                      zIndex: "1",
                    },
                    input: {
                      borderColor: "#7e8085",
                    },
                  }}
                />
                <Input
                  clearable
                  bordered
                  labelPlaceholder="Email"
                  onChange={(e) => handleForm(e)}
                  name="email"
                  value={form.email}
                  type="email"
                  required
                  css={{
                    backgroundColor: "white",
                    borderColor: "#7e8085",
                    label: {
                      color: "#7e8085",
                      zIndex: "1",
                    },
                    input: {
                      borderColor: "#7e8085",
                    },
                  }}
                />
                <Textarea
                  bordered
                  className="w-full"
                  color="grey"
                  labelPlaceholder="Escribe tu mensaje"
                  onChange={(e) => handleForm(e)}
                  name="mensaje"
                  rows="5"
                  placeholder="Escribe tu mensaje"
                  value={form.mensaje}
                  required
                  css={{
                    width: "100%",
                    backgroundColor: "white",
                    borderColor: "#7e8085",
                    label: {
                      color: "#7e8085",
                      zIndex: "1",
                    },
                    input: {
                      borderColor: "#7e8085",
                    },
                  }}
                />
                <>
                  <div className="form-group flex flex-col gap-3 form-check ">
                    <div className="flex flex-row">
                      <input
                        name="acceptTerms"
                        type="checkbox"
                        id="acceptTerms"
                        required
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="form-check-label w-full"
                      >
                        He leído y acepto la{" "}
                        <Link passHref href="/privacidad">
                          <a style={{ color: "black", fontWeight: "bold" }}>
                            política de privacidad
                          </a>
                        </Link>
                      </label>
                    </div>
                    <div className="flex flex-row">
                      {" "}
                      <input
                        name="acceptTerms2"
                        type="checkbox"
                        id="acceptTerms"
                        required
                      />
                      <label
                        htmlFor="acceptTerms2"
                        className="form-check-label"
                      >
                        Acepto recibir comunicaciones comerciales
                      </label>
                    </div>
                  </div>
                </>
                {mensaje && <span className="error">{mensaje}</span>}{" "}
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                  }}
                  className="enviarform"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center mensajeContenedor">
            <span className="mensajeEnviado">
              ¡Gracias por contactar con nosotros!
            </span>
            <span className="mensajeEnviado2">
              Pronto nos pondremos en contacto contigo
            </span>
          </div>
        </>
      )}

      <style jsx>{`
        .formulario {
          display: flex;
          flex-direction: column;
          margin-top: 40px;
        }
        input[type="email"],
        input[name="nombre"] {
          padding: 10px;
          background-color: transparent;
          border-bottom: 1px solid grey;
          color: white;
        }
        .formulario input,
        textarea {
          padding: 10px;
          background-color: transparent;
          border-bottom: 1px solid grey;
          color: black;
        }
        textarea {
          border: solid 1px grey;
          resize: none;
          margin-bottom: 10px;
          max-height: 113px;
          height: 100%;
        }
        .form-check-label {
          color: black;
          font-family: ${options.fuente_global};
          font-size: 12px;
          margin-left: 10px;
        }

        #upload {
          z-index: -1;
          opacity: 0;
          postion: absolute;
        }

        .aplicar {
          background-color: white;
          color: black;
          font-family: ${options.fuente_global};
          padding: 10px 20px;
          font-size: 18px;
          border-radius: 5px;
          font-weight: bold;
          border: 2px solid white;
          cursor: pointer;
        }
        #upload {
          display: none;
        }
        .aplicar:hover {
          background-color: transparent;
          color: white;
          border: 2px solid white;
        }
        .mensajeEnviado {
          font-family: ${options.fuente_global};
          font-size: 50px;
          color: black;
          font-weight: bold;
        }
        .mensajeEnviado2 {
          font-family: ${options.fuente_global};
          font-size: 40px;
          color: black;
          font-weight: bold;
        }
        .tituloContacto {
          color: white;
          font-family: ${options.fuente_global};
          font-size: calc(42px + (100 - 27) * (100vh - 320px) / (2560 - 320));
          width: 100%;
          font-style: italic;
          line-height: calc(35px + (102 - 13) * (100vh - 320px) / (2560 - 320));
          font-weight: bold;
          display: block;
          margin-top: 10%;
        }
        .mensajeContenedor {
          height: 20vh;
        }
        .error {
          color: red;
          font-family: ${options.fuente_global};
          font-size: 12px;
          margin-top: 10px;
        }
        @media (max-width: 768px) {
          textarea {
            max-height: 200px;
          }
        }
      `}</style>
    </>
  );
};
export default FormularioContacto;
