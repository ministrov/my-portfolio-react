import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import TestimonialCard from '../testimonialCard/TestimonialCard';
import clientAvatar1 from '../../assets/png/john-doe.png';
import clientAvatar2 from '../../assets/png/ava-girl.png';
import clientAvatar3 from '../../assets/png/john-doe2.png';
import './style.css';

const Carousel = ({ className }) => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      content: t('testimonials.contentOne'),
      user: t('testimonials.user1.name'),
      profession: t('testimonials.user1.profession'),
      avatar: clientAvatar1,
    },
    {
      id: 2,
      content: t('testimonials.contentTwo'),
      user: t('testimonials.user2.name'),
      profession: t('testimonials.user2.profession'),
      avatar: clientAvatar2,
    },
    {
      id: 3,
      content: t('testimonials.contentThree'),
      user: t('testimonials.user3.name'),
      profession: t('testimonials.user3.profession'),
      avatar: clientAvatar3,
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
        delay: 3000,
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
            avatar={testimonial.avatar}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
