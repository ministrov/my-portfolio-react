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
      user: t('testimonials.user1.name'),
      profession: t('testimonials.user1.profession'),
    },
    {
      id: 2,
      content: t('testimonials.contentTwo'),
      user: t('testimonials.user2.name'),
      profession: t('testimonials.user2.profession'),
    },
    {
      id: 3,
      content: t('testimonials.contentThree'),
      user: t('testimonials.user3.name'),
      profession: t('testimonials.user3.profession'),
    },
  ];

  return (
    <Swiper
      className={`${className} carousel`}
      modules={[Autoplay, EffectFade]} // Только нужные модули
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true, // Пауза при наведении
      }}
      loop={true}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <TestimonialCard
            content={testimonial.content}
            user={testimonial.user}
            profession={testimonial.profession}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
