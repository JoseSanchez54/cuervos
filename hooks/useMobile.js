import { useState, useEffect, useRef } from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState("");
  useEffect(() => {
    setWidth(window.innerWidth);
    return;
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (width < 1022) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    return;
  }, [width]);
  return { isMobile, width };
}
export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current?.offsetWidth;
    dimensions.current.height = ref.current?.offsetHeight;
  }, []);
  return dimensions.current;
};
