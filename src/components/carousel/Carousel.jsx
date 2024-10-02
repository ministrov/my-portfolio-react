import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import TestimonialCard from "../testimonialCard/TestimonialCard";
import ControlLeft from "./controlLeft/ControlLeft";
import ControlRight from "./controlRight/ControlRight";
import "./style.css";

const Carousel = ({ className }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const moveSlideLeft = () => {
    console.log('click left');
  };

  const moveSlideRight = () => {
    console.log('click right');
  };

  return (
    <Swiper 
      className={`${className} carousel`}
    >
      <div 
        className="carousel__inner"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
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

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </div>
      <div className="carousel__controls">
        <ControlLeft className="carousel__btn_prev" 
          moveLeft={moveSlideLeft} 
        />
        <ControlRight
          className="carousel__btn_next"
          moveRight={moveSlideRight}
        />
      </div>
    </Swiper>
  );
};

export default Carousel;
