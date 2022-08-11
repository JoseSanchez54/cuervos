import Image from "next/image";
import { GrClose } from "react-icons/gr/";
import axios from "axios";
import { Input, useInput } from "@nextui-org/react";
import { useState, useMemo } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import WooCommerce from "../woocommerce/Woocommerce";

const LoginForm = ({ opciones, login, set }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [registro, setRegistro] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    olvidado: "",
    code: "",
    email: "",
  });
  const [olvidar, setOlvidar] = useState(false);
  const [code, setCode] = useState(false);
  const [error, setError] = useState("");
  const handleActivo = () => {
    set(false);
    setError("");
    setForm({
      username: "",
      password: "",
      olvidado: "",
      code: "",
      email: "",
    });
  };
  const handleRegistro = () => {
    setRegistro(!registro);
    setForm({
      username: "",
      password: "",
      olvidado: "",
      code: "",
      email: "",
    });
  };
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
      username: form.email,
      password: form.password,
    };
    setLoading(true);
    const res = await axios
      .post("/api/login", data)
      .then((response) => {
        dispatch({
          type: "@Add",
          token: response.data.token,
          email: form.email,
        });
        document.cookie =
          "session=" +
          response.data.token +
          "; expires=" +
          response.data.expires;
        set(false);
        window.location.reload();
      })
      .catch((error) => {
        setError("El login es incorrecto");
        setLoading(false);
      });
  };
  const SendOlvidar = async () => {
    setLoading(true);
    const res = await axios
      .post(process.env.URLBASE + "wp-json/bdpwr/v1/reset-password", {
        email: form.email,
      })
      .then((res) => {
        setLoading(false);
        setError("Se ha enviado un correo para restablecer la contraseña");
      })
      .catch((err) => {
        setError("El correo no existe");
        setLoading(false);
      });
  };
  const SendCode = () => {
    setLoading(true);
    axios
      .post(process.env.URLBASE + "wp-json/bdpwr/v1/set-password", {
        code: form.code,
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        setCode(false);
        setOlvidar(false);
        setLoading(false);
        setForm({
          username: "",
          password: "",
          olvidado: "",
          code: "",
          email: "",
        });
        setError("Se ha restablecido la contraseña");
      })
      .catch((err) => {
        setLoading(false);
        setError("El código no es correcto");
      });
  };
  const SendRegister = async () => {
    setLoading(true);
    const wcForm = {
      email: form.email,
    };
    const wcCustomer = await WooCommerce.post("customers", wcForm)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(
        process.env.URLBASE +
          `wp-json/wp/v2/users/register?email=${form.email}&password=${form.password}`,
        {
          email: form.email,
          password: form.password,
        }
      )
      .then((res) => {
        setCode(false);
        setOlvidar(false);
        setLoading(false);
        setForm({
          username: "",
          password: "",
          olvidado: "",
          code: "",
          email: form.email,
        });
        setError("Cuenta creada correctamente");
        setRegistro(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("No se ha podido crear la cuenta");
      });
  };
  const { value, reset, bindings, currentRef } = useInput("");

  const validateEmail = (value) => {
    return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  };

  const helperMail = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    if (isValid) setForm({ ...form, email: value });
    return {
      text: isValid ? "" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

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
            <div className="flex flex-col max-w-[1200px] items-center justify-center w-full">
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
                        className="mt-5 text-center w-full"
                      >
                        <Input
                          {...bindings}
                          clearable
                          labelPlaceholder="Email"
                          initialValue="Email"
                          name="email"
                          onClearClick={reset}
                          status={helperMail.color}
                          color={helperMail.color}
                          helperColor={helperMail.color}
                          helperText={helperMail.text}
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
                          labelPlaceholder="Introduce tu nueva contraseña"
                          initialValue="password"
                          onChange={(e) => handleForm(e)}
                          name="password"
                          value={form.password}
                          type="password"
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
                          labelPlaceholder="Codigo"
                          initialValue="Codigo"
                          onChange={(e) => handleForm(e)}
                          name="code"
                          value={form.code}
                          type="password"
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
                        className="mt-5 text-center w-full"
                        style={{
                          fontFamily: opciones?.fuente_global,
                          fontSize: "18px",
                        }}
                        onClick={() => {
                          setOlvidar(false);
                          setCode(false);
                          setRegistro(false);
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
                        className="mt-5 text-center w-full"
                      >
                        <Input
                          {...bindings}
                          clearable
                          labelPlaceholder="Email"
                          initialValue="Email"
                          name="email"
                          onClearClick={reset}
                          status={helperMail.color}
                          color={helperMail.color}
                          helperColor={helperMail.color}
                          helperText={helperMail.text}
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

                      <button
                        style={{
                          fontFamily: opciones?.fuente_global,
                          fontSize: "18px",
                        }}
                        className="mt-5 text-center w-full"
                        onClick={() => handleCode()}
                      >
                        He recibido el codigo de verificacion
                      </button>
                      <button
                        style={{
                          fontFamily: opciones?.fuente_global,
                          fontSize: "18px",
                        }}
                        className="mt-5 text-center w-full"
                        onClick={() => {
                          setOlvidar(false);
                          setCode(false);
                          setRegistro(false);
                        }}
                      >
                        Atras
                      </button>
                    </>
                  ) : (
                    <>
                      {registro && !code && (
                        <>
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
                            className="mt-9"
                          >
                            <Input
                              {...bindings}
                              clearable
                              labelPlaceholder="Email"
                              initialValue="Email"
                              name="email"
                              onClearClick={reset}
                              status={helperMail.color}
                              color={helperMail.color}
                              helperColor={helperMail.color}
                              helperText={helperMail.text}
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
                                div: {
                                  borderRadius: "0",
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
                              labelPlaceholder="Contraseña"
                              initialValue="password"
                              onChange={(e) => handleForm(e)}
                              name="password"
                              value={form.password}
                              type="password"
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
                                div: {
                                  borderRadius: "0",
                                },
                              }}
                            />
                          </motion.div>
                          <button
                            onClick={() => SendRegister()}
                            className="mt-9"
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                              padding: "10px 20px",
                            }}
                          >
                            Crear cuenta
                          </button>
                          <button
                            style={{
                              fontFamily: opciones?.fuente_global,
                              fontSize: "18px",
                            }}
                            className="mt-5 text-center w-full"
                            onClick={() => handleOlvidar()}
                          >
                            He olvidado mi contraseña
                          </button>
                          <button
                            style={{
                              fontFamily: opciones?.fuente_global,
                              fontSize: "18px",
                            }}
                            className="mt-5 text-center w-full"
                            onClick={() => {
                              setOlvidar(false);
                              setCode(false);
                              setRegistro(false);
                            }}
                          >
                            Atras
                          </button>
                        </>
                      )}
                      {!code && !registro && (
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
                            className="mt-5 text-center w-full"
                          >
                            <Input
                              {...bindings}
                              clearable
                              labelPlaceholder="Email"
                              initialValue="Email"
                              name="email"
                              onClearClick={reset}
                              status={helperMail.color}
                              color={helperMail.color}
                              helperColor={helperMail.color}
                              helperText={helperMail.text}
                              required
                              css={{
                                backgroundColor: "white",
                                borderColor: "#7e8085",
                                fontFamily: opciones.fuente_global,
                                borderRadius: "0",
                                label: {
                                  color: "#7e8085",
                                  zIndex: "1",
                                  borderRadius: "0",
                                },
                                input: {
                                  borderColor: "#7e8085",
                                  borderRadius: "0",
                                },
                                div: {
                                  borderRadius: "0",
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
                              labelPlaceholder="Contraseña"
                              initialValue="password"
                              onChange={(e) => handleForm(e)}
                              name="password"
                              value={form.password}
                              type="password"
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
                                div: {
                                  borderRadius: "0",
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
                          <button
                            style={{
                              fontFamily: opciones?.fuente_global,
                              fontSize: "18px",
                            }}
                            className="mt-5 text-center w-full"
                            onClick={() => handleOlvidar()}
                          >
                            He olvidado mi contraseña
                          </button>
                          <button
                            style={{
                              fontFamily: opciones?.fuente_global,
                              fontSize: "18px",
                            }}
                            className="mt-5 text-center w-full"
                            onClick={() => handleRegistro()}
                          >
                            ¿Aún no tienes cuenta? ¡Regístrate ya!
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
