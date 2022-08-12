import { Input } from "@nextui-org/react";
import { useState } from "react";
const userForm = ({ opciones }) => {
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
  return (
    <div className="flex flex-row w-full justify-center">
      <div className="flex flex-col w-full items-center">
        <div className="flex lfex-row w-full">
          <div className="flex flex-col w-1/2">
            <Input
              {...bindings}
              clearable
              labelPlaceholder="Email"
              initialValue="Email"
              name="email"
              onClearClick={reset}
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
          <div className="flex flex-col w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
