import { Swiper, SwiperSlide } from "swiper/react";
import SingleGrid from "./SingleGrid";
import "swiper/css";
const OfertaSlider = ({ productos, opciones }) => {
  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={1.4}>
        {productos?.map((e, index) => {
          return (
            <>
              {e.slug !== "destacados" && e.slug !== "todos" && (
                <>
                  <SwiperSlide key={index}>
                    <SingleGrid
                      producto={e}
                      opciones={opciones}
                      oferta={true}
                    />
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
