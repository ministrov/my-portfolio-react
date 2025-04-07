import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from '../testimonialCard/TestimonialCard';
// import { testimonials } from '../../helpers/mocks';
import './style.css';

const Carousel = ({ className }) => {
  const testimonials = [
    {
      id: 1,
      content:
        'I was amazed by the exceptional quality of service and attention to detail—truly a top-notch experience!',
    },
    {
      id: 2,
      content:
        "Their professionalism and dedication made all the difference. I couldn't be happier with the results.",
    },
    {
      id: 3,
      content:
        'The level of expertise and care they provided exceeded my expectations, highly recommended!',
    },
    // {
    //   id: 4,
    //   content:
    //     'The level of expertise and care they provided exceeded my expectations, highly recommended!',
    // },
    // {
    //   id: 5,
    //   content:
    //     'The level of expertise and care they provided exceeded my expectations, highly recommended!',
    // },
  ];
  return (
    <Swiper
      className={`${className} carousel`}
      spaceBetween={30}
      centeredSlides={true}
      // autoplay={{
      //   delay: 2000,
      // }}
      // modules={[Autoplay, EffectFade]}
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
