import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from '../testimonialCard/TestimonialCard';
import { testimonials } from './testimonials';
import './style.css';

const Carousel = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Swiper
      className={`${className} carousel`}
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <TestimonialCard
            content={t(testimonial.content)}
            user={t(testimonial.user)}
            profession={t(testimonial.profession)}
            avatar={testimonial.avatar}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
