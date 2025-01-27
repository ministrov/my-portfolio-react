import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from "../testimonialCard/TestimonialCard";
import "./style.css";

const Carousel = ({ className }) => {
  return (
    <Swiper 
      className={`${className} carousel`}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2000
      }}
      modules={[Autoplay, EffectFade]}
    >
      <SwiperSlide>
        <TestimonialCard content={"I was amazed by the exceptional quality of service and attention to detail—truly a top-notch experience!"} />
      </SwiperSlide>
      <SwiperSlide>
        <TestimonialCard content={"Their professionalism and dedication made all the difference. I couldn't be happier with the results."} />
      </SwiperSlide>
      <SwiperSlide>
        <TestimonialCard content={"The level of expertise and care they provided exceeded my expectations, highly recommended!"} />
      </SwiperSlide>
      <SwiperSlide>
        <TestimonialCard content={"The level of expertise and care they provided exceeded my expectations, highly recommended!"} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
