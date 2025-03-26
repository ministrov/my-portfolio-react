import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import TestimonialCard from "../testimonialCard/TestimonialCard";
import { testimonials } from "../../helpers/mocks";
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
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <TestimonialCard content={testimonial.content} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
