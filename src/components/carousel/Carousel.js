import { useRef } from 'react';
import TestimonialCard from '../testimonialCard/TestimonialCard';
import ControlLeft from './controlLeft/ControlLeft';
import ControlRight from './controlRight/ControlRight';
import './style.css';

const Carousel = () => {
  const slider = useRef();

  console.log(slider);

  const moveSlideLeft = () => {
    slider.current?.scrollBy(-334, 0);
  };

  const moveSlideRight = () => {
    slider.current?.scrollBy(334, 0);
  };

  return (
    <div className="carousel">
      <div ref={slider} className="carousel__inner">
        <TestimonialCard
          title={'Start'}
          simultaniousParsing={1}
          parsingPerDay={5}
          price={'99 $'}
          gatheringAudience={1}
        />
        <TestimonialCard
          title={'Standard'}
          simultaniousParsing={3}
          parsingPerDay={15}
          price={'149 $'}
          gatheringAudience={2}
        />
        <TestimonialCard
          title={'Gift'}
          simultaniousParsing={5}
          parsingPerDay={15}
          price={'199 $'}
          gatheringAudience={3}
        />
        <TestimonialCard
          title={'Business'}
          simultaniousParsing={5}
          parsingPerDay={15}
          price={'299 $'}
          gatheringAudience={3}
        />
        <TestimonialCard
          title={'Premium'}
          simultaniousParsing={5}
          parsingPerDay={15}
          price={'499 $'}
          gatheringAudience={3}
        />
      </div>
      <div className="carousel__controls">
        <ControlLeft
          className="carousel__btn_prev"
          moveLeft={moveSlideLeft}
        />
        <ControlRight
          className="carousel__btn_next"
          moveRight={moveSlideRight}
        />
      </div>
    </div>
  );
};

export default Carousel;
