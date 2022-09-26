import { Input, Textarea, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import { useOptions } from "../hooks/useOptions";
const CustomForm = ({ status, message, onValidated }) => {
  const { options } = useOptions();
  let email, checkbox;
  console.log(checkbox);
  const submit = (e) =>
    e.preventdefault() &&
    email &&
    checkbox &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  return (
    <form onSubmit={submit}>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-full items-center">
          <span
            className="my-5 text-center"
            style={{
              fontFamily: options?.fuente_global,
              color: "black",
              fontSize: "28px",
            }}
          >
            Suscríbete a nuestra newsletter
          </span>
          <div
            style={{
              padding: 10,
              display: "flex flex-row w-full my-5",
            }}
          >
            <Input
              css={{
                backgroundColor: "white",
                borderColor: "#7e8085",
                label: {
                  color: "#7e8085",
                  zIndex: "1",
                  borderRadius: "0px",
                },
                input: {
                  borderColor: "#7e8085",
                },
              }}
              ref={(node) => (email = node)}
              type="email"
              placeholder="Email"
            />

            <button
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "10px 20px",
              }}
            >
              Suscribirse
            </button>
          </div>
          <div className="flex flex-col items-center w-full justify-center">
            <div className="flex flex-row mt-2">
              <input
                ref={(node) => (checkbox = node)}
                name="acceptTerms"
                type="checkbox"
                id="acceptTerms"
                required
              />
              <label
                htmlFor="acceptTerms"
                className="form-check-label mx-1 w-full"
                style={{
                  fontFamily: options?.fuente_global,
                }}
              >
                He leído y acepto la{" "}
                <Link passHref href="/privacidad">
                  <a
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: options?.fuente_global,
                    }}
                  >
                    política de privacidad
                  </a>
                </Link>
              </label>
            </div>
            <div className="flex flex-row mt-2 mb-9">
              <input
                name="acceptTerms2"
                type="checkbox"
                id="acceptTerms"
                required
              />
              <label
                style={{
                  fontFamily: options?.fuente_global,
                }}
                htmlFor="acceptTerms2"
                className="form-check-label mx-1"
              >
                Acepto recibir comunicaciones comerciales
              </label>
            </div>
          </div>
        </div>
      </div>
      {status === "sending" && <div style={{ color: "blue" }}>Enviando...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </form>
  );
};
export default CustomForm;
