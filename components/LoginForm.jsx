import Image from "next/image";
import { GrClose } from "react-icons/gr/";
import axios from "axios";
const LoginForm = ({ opciones, login, set }) => {
  const handleActivo = () => {
    set(false);
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
          </div>
        </div>
      )}
    </>
  );
};
export default LoginForm;
