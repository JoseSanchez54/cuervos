import Image from "next/image";
import { GrClose } from "react-icons/gr/";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ opciones, login, set }) => {
  const [loading, setLoading] = useState(false);
  const [olvidar, setOlvidar] = useState(false);
  const [code, setCode] = useState(false);
  const [error, setError] = useState("");
  const handleActivo = () => {
    set(false);
  };
  const [form, setForm] = useState({
    username: "",
    password: "",
    olvidado: "",
    code: "",
  });
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOlvidar = () => {
    setOlvidar(!olvidar);
  };
  const handleCode = () => {
    setCode(!code);
  };

  const SendLogin = async () => {
    const data = {
      username: form.username,
      password: form.password,
    };
    setLoading(true);
    const res = await axios
      .post("/api/login", data)
      .then((response) => {
        document.cookie =
          "session=" +
          response.data.token +
          "; expires=" +
          response.data.expires;
        window.location.reload();
      })
      .catch((error) => {
        setError("El login es incorrecto");
        setLoading(false);
      });
  };
  const SendOlvidar = async () => {
    const res = await axios
      .post(process.env.URLBASE + "wp-json/bdpwr/v1/reset-password", {
        email: form.olvidado,
      })
      .then((res) => {
        setOlvidar(false);
        setError("Se ha enviado un correo para restablecer la contraseña");
      })
      .catch((err) => setError("El correo no existe"));
  };
  const SendCode = () => {
    setLoading(true);
    axios
      .post(process.env.URLBASE + "wp-json/bdpwr/v1/set-password", {
        code: form.code,
        email: form.olvidado,
        password: form.password,
      })
      .then((res) => {
        setCode(false);
        setOlvidar(false);
        setLoading(false);
        setError("Se ha restablecido la contraseña");
      })
      .catch((err) => setError("El código no es correcto"));
  };
  return (
    <>
      <AnimatePresence>
        {login && (
          <div className="flex z-[100]  fixed top-0 flex-row w-screen h-screen bg-white justify-center items-center">
            <GrClose
              onClick={() => handleActivo()}
              size="30px"
              className="absolute cursor-pointer top-9 right-9"
            />
            <div className="flex flex-col max-w-[1000px] items-center justify-center w-full">
              <Image
                src={opciones.logo_principal}
                height="200px"
                width="200px"
                objectFit="contain"
              ></Image>

              {loading ? (
                <>
                  <SyncLoader color="#000" />
                </>
              ) : (
                <>
                  {code && (
                    <>
                      <motion.div
                        key="initee"
                        exit={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        initial={{
                          opacity: 0,
                        }}
                        className="mt-5"
                      >
                        <Input
                          clearable
                          bordered
                          labelPlaceholder="Email"
                          initialValue="Email"
                          onChange={(e) => handleForm(e)}
                          name="username"
                          value={form.username}
                          required
                          css={{
                            backgroundColor: "white",
                            borderColor: "#7e8085",
                            fontFamily: opciones.fuente_global,
                            label: {
                              color: "#7e8085",
                              zIndex: "1",
                            },
                            input: {
                              borderColor: "#7e8085",
                            },
                          }}
                        />
                      </motion.div>
                      <motion.div
                        key="init2"
                        exit={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        initial={{
                          opacity: 0,
                        }}
                        className="mt-9"
                      >
                        <Input
                          clearable
                          bordered
                          labelPlaceholder="Introduce tu nueva contraseña"
                          initialValue="password"
                          onChange={(e) => handleForm(e)}
                          name="password"
                          value={form.password}
                          required
                          css={{
                            backgroundColor: "white",
                            borderColor: "#7e8085",
                            fontFamily: opciones.fuente_global,
                            label: {
                              color: "#7e8085",
                              zIndex: "1",
                            },
                            input: {
                              borderColor: "#7e8085",
                            },
                          }}
                        />
                      </motion.div>
                      <motion.div
                        key="init3"
                        exit={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        initial={{
                          opacity: 0,
                        }}
                        className="mt-9"
                      >
                        <Input
                          clearable
                          bordered
                          labelPlaceholder="Codigo"
                          initialValue="Codigo"
                          onChange={(e) => handleForm(e)}
                          name="code"
                          value={form.code}
                          required
                          css={{
                            backgroundColor: "white",
                            borderColor: "#7e8085",
                            fontFamily: opciones.fuente_global,
                            label: {
                              color: "#7e8085",
                              zIndex: "1",
                            },
                            input: {
                              borderColor: "#7e8085",
                            },
                          }}
                        />
                      </motion.div>
                      <button
                        onClick={() => SendCode()}
                        className="mt-9"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                          padding: "10px 20px",
                        }}
                      >
                        Cambiar contraseña
                      </button>
                      <button
                        onClick={() => {
                          handleOlvidar();
                          handleCode();
                        }}
                      >
                        Atras
                      </button>
                    </>
                  )}
                  {olvidar && !code ? (
                    <>
                      <motion.div
                        key="init"
                        exit={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        initial={{
                          opacity: 0,
                        }}
                        className="mt-5"
                      >
                        <Input
                          clearable
                          bordered
                          labelPlaceholder="Email"
                          initialValue="Email"
                          onChange={(e) => handleForm(e)}
                          name="olvidado"
                          value={form.olvidado}
                          required
                          css={{
                            backgroundColor: "white",
                            borderColor: "#7e8085",
                            fontFamily: opciones.fuente_global,
                            label: {
                              color: "#7e8085",
                              zIndex: "1",
                            },
                            input: {
                              borderColor: "#7e8085",
                            },
                          }}
                        />
                      </motion.div>
                      <button
                        onClick={() => SendOlvidar()}
                        className="mt-9"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                          padding: "10px 20px",
                        }}
                      >
                        Enviar
                      </button>
                      <button onClick={() => handleCode()}>
                        He recibido el codigo de verificacion
                      </button>
                    </>
                  ) : (
                    <>
                      {!code && (
                        <>
                          {" "}
                          <motion.div
                            key="initd"
                            exit={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                            initial={{
                              opacity: 0,
                            }}
                            className="mt-5"
                          >
                            <Input
                              clearable
                              bordered
                              labelPlaceholder="Nombre de usuario"
                              initialValue="Nombre de usuario"
                              onChange={(e) => handleForm(e)}
                              name="username"
                              value={form.username}
                              required
                              css={{
                                backgroundColor: "white",
                                borderColor: "#7e8085",
                                fontFamily: opciones.fuente_global,
                                label: {
                                  color: "#7e8085",
                                  zIndex: "1",
                                },
                                input: {
                                  borderColor: "#7e8085",
                                },
                              }}
                            />
                          </motion.div>
                          <motion.div
                            key="init4"
                            exit={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                            initial={{
                              opacity: 0,
                            }}
                            className="mt-9"
                          >
                            <Input
                              clearable
                              bordered
                              labelPlaceholder="Contraseña"
                              initialValue="password"
                              onChange={(e) => handleForm(e)}
                              name="password"
                              value={form.password}
                              required
                              css={{
                                backgroundColor: "white",
                                borderColor: "#7e8085",
                                fontFamily: opciones.fuente_global,
                                label: {
                                  color: "#7e8085",
                                  zIndex: "1",
                                },
                                input: {
                                  borderColor: "#7e8085",
                                },
                              }}
                            />
                          </motion.div>
                          <button
                            onClick={() => SendLogin()}
                            className="mt-9"
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                              padding: "10px 20px",
                            }}
                          >
                            Login
                          </button>
                          <button onClick={() => handleOlvidar()}>
                            He olvidado mi contraseña
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {!loading && (
                <span
                  className="mt-7"
                  style={{
                    fontFamily: opciones?.fuente_global,
                    fontSize: "18px",
                  }}
                >
                  {error}
                </span>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default LoginForm;
