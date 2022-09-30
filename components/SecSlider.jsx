import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import { BsArrowRightCircleFill } from "react-icons/bs";
const SecSlider = ({ sectores, opciones }) => {
  const IconoFlecha = motion(BsArrowRightCircleFill);
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
      <Swiper spaceBetween={10} slidesPerView={1.4}>
        {sectores?.map((sec, index) => {
          return (
            <>
              {sec.slug !== "destacados" && sec.slug !== "todos" && (
                <>
                  <SwiperSlide key={index}>
                    <AnimatePresence>
                      <Link passHref href={"/sectores/" + sec?.slug}>
                        <a className="min-h-[126px] max-w-[285px] justify-end items-end w-1/4">
                          <motion.div
                            initial="initial"
                            whileHover="hover"
                            className="flex flex-col relative p-5 min-h-[126px] max-w-[285px] justify-end items-end"
                          >
                            <motion.span
                              variants={divMotion2}
                              className="z-[20] flex gap-1"
                              style={{
                                fontFamily: opciones.fuente_global,
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#ffffff",
                                textTransform: "capitalize",
                              }}
                            >
                              {sec?.meta.nombre} <IconoFlecha />
                            </motion.span>
                            <Image
                              objectFit="cover"
                              layout="fill"
                              src={sec?.meta?.imagen}
                            />
                          </motion.div>
                        </a>
                      </Link>
                    </AnimatePresence>
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
export default SecSlider;
