import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleGrid from "./SingleGrid";
import "swiper/css";
const OfertaSlider = ({ productos, opciones }) => {
  const IconoFlecha = motion(BsArrowRightCircleFill);
  const spanMotion = {
    initial: {
      fontFamily: opciones?.fuente_global,
      fontSize: "20px",
      color: "#35233C",
      display: "flex",
      gap: "5px",
    },
    hover: {
      color: "#ffffff",
    },
  };
  const divMotion = {
    initial: {
      backgroundColor: "#F0F0F0",
      borderRadius: "15px",
    },
    hover: {
      backgroundColor: "#F7546C",
    },
  };
  const divMotion2 = {
    initial: {
      x: 0,
      width: "fit-content",
    },
    hover: {
      x: 7,
    },
  };

  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={1.4}>
        {productos?.map((e, index) => {
          return (
            <>
              {e.slug !== "destacados" && e.slug !== "todos" && (
                <>
                  <SwiperSlide>
                    <SingleGrid />
                  </SwiperSlide>
                </>
              )}
            </>
          );
        })}
      </Swiper>
    </>
  );
};
export default OfertaSlider;
