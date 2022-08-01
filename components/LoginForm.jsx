import Image from "next/image";
import { GrClose } from "react-icons/gr/";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ opciones, login, set }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleActivo = () => {
    set(false);
  };
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
  return (
    <>
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
                <AnimatePresence>
                  <motion.div
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
                  <div className="mt-9">
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
                        label: {
                          color: "#7e8085",
                          zIndex: "1",
                        },
                        input: {
                          borderColor: "#7e8085",
                        },
                      }}
                    />
                  </div>
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
                </AnimatePresence>
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
    </>
  );
};
export default LoginForm;
