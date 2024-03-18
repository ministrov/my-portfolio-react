import { useRef } from "react";
import TestimonialCard from "../testimonialCard/TestimonialCard";
import ControlLeft from "./controlLeft/ControlLeft";
import ControlRight from "./controlRight/ControlRight";
import "./style.css";

const Carousel = ({ className }) => {
  const slider = useRef(null);

  const moveSlideLeft = () => {
    slider.current?.scrollBy(-334, 0);
  };

  const moveSlideRight = () => {
    slider.current?.scrollBy(334, 0);
  };

  return (
    <div className={`${className} carousel`}>
      <div ref={slider} className="carousel__inner">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>
      <div className="carousel__controls">
        <ControlLeft className="carousel__btn_prev" moveLeft={moveSlideLeft} />
        <ControlRight
          className="carousel__btn_next"
          moveRight={moveSlideRight}
        />
      </div>
    </div>
  );
};

export default Carousel;
