import Image from "next/image";
import { GrClose } from "react-icons/gr/";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import md5 from "md5";
const LoginForm = ({ opciones, login, set }) => {
  const handleActivo = () => {
    set(false);
  };
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(
    process.env.URLBASE +
      "/wp-json/custom-plugin/login?username=" +
      form.email +
      "&password=" +
      form.password
  );
  const SendLogin = async () => {
    const responde = axios
      .post(process.env.URLBASE, {
        params: {
          ID: 12345,
        },
      })
      .then((res) => {
        const token = md5(res.data.data);
        localStorage.setItem("pixel", token);
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
            <div>
              {" "}
              <Input
                clearable
                bordered
                labelPlaceholder="Email"
                initialValue="Email"
                onChange={(e) => handleForm(e)}
                name="email"
                value={form.email}
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
          </div>
        </div>
      )}
    </>
  );
};
export default LoginForm;
