import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from "../testimonialCard/TestimonialCard";
// import ControlLeft from "./controlLeft/ControlLeft";
// import ControlRight from "./controlRight/ControlRight";
import "./style.css";
// import 'swiper/css/effect-fade';

const Carousel = ({ className }) => {
  // const swiper = useSwiper();

  // console.log(swiper);
  // const moveSlideLeft = () => {
  //   console.log('click left');
  //   // swiper.slideNext();
  // };

  // const moveSlideRight = () => {
  //   console.log('click right');
  //   // swiper.slidePrev();
  // };

  return (
    <Swiper 
      className={`${className} carousel`}
      spaceBetween={30}
      centeredSlides={true}
      // effect={'fade'}
      autoplay={{
        delay: 2000
      }}
      modules={[Autoplay, EffectFade]}
      // onSlideChange={() => console.log('clide changes')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {/* <ControlLeft className="carousel__btn_prev" 
        moveLeft={moveSlideLeft} 
      /> */}
      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>
      {/* <ControlRight
        className="carousel__btn_next"
        moveRight={moveSlideRight}
      /> */}
    </Swiper>
  );
};

export default Carousel;
