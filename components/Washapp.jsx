import Image from "next/image";
import { useOptions } from "../hooks/useOptions";

/**
 * It's a button that opens a new tab with a link to a whatsapp chat with a phone number.
 * @returns A React component.
 */
const Washapp = () => {
  const { options } = useOptions();
  return (
    <>
      <button className="fixed z-[99] bottom-2 right-2">
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://api.whatsapp.com/send?phone=" + options?.washapp}
        >
          <Image height="60px" width="60px" src="/whatsapp.svg"></Image>
        </a>
      </button>
    </>
  );
};
export default Washapp;
