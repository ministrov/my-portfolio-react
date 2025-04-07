import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from '../testimonialCard/TestimonialCard';
import './style.css';

const Carousel = ({ className }) => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      content: t('testimonials.contentOne'),
    },
    {
      id: 2,
      content: t('testimonials.contentTwo'),
    },
    {
      id: 3,
      content: t('testimonials.contentThree'),
    },
  ];

  return (
    <Swiper
      className={`${className} carousel`}
      spaceBetween={30}
      centeredSlides={true}
      // autoplay={{
      //   delay: 2000,
      // }}
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
