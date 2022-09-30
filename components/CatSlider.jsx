import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const CatSlider = ({ categorias, opciones }) => {
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
        {categorias?.map((e, index) => {
          return (
            <>
              {e.slug !== "destacados" && e.slug !== "todos" && (
                <>
                  <SwiperSlide>
                    <AnimatePresence>
                      <motion.div
                        key={index}
                        variants={divMotion}
                        initial="initial"
                        whileHover="hover"
                        className="flex flex-col items-end justify-end relative p-5 max-w-screen min-h-[133px] w-full"
                      >
                        <motion.div variants={divMotion2} className="z-[29]">
                          <Link href={"/categorias/" + e?.slug} passHref>
                            <a>
                              <motion.span variants={spanMotion}>
                                {e?.name}
                                <IconoFlecha />
                              </motion.span>
                            </a>
                          </Link>
                        </motion.div>

                        {e?.image?.src && (
                          <Image
                            objectFit="contain"
                            objectPosition="left"
                            layout="fill"
                            src={e?.image?.src}
                          />
                        )}
                      </motion.div>
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
export default CatSlider;
