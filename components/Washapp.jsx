import Image from "next/image";
import { useOptions } from "../hooks/useOptions";
import Link from "next/link";
const Washapp = () => {
  const { options } = useOptions();
  return (
    <>
      <button className="fixed bottom-1 right-1">
        <a
          target="_blank"
          href={"https://api.whatsapp.com/send?phone=" + options?.washapp}
        >
          <Image height="60px" width="60px" src="/whatsapp.svg"></Image>
        </a>
      </button>
    </>
  );
};
export default Washapp;
