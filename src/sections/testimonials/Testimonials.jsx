import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { LazyMotion, m, domAnimation } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import TestimonialCard from '../../components/testimonialCard/TestimonialCard';
import useRevealMotion from '../../hooks/useRevealMotion';
import { testimonials } from './testimonials';
import './style.css';

/**
 * Конфигурация Swiper: центрированный активный слайд с подглядывающими соседями.
 * Ширина слайда задаётся в CSS (`slidesPerView: 'auto'`), поэтому соседи выходят
 * за пределы контейнера-центровщика. Сообщения навигации переиспользуют ключи
 * `carousel.*`.
 * @param {(key: string) => string} t - Функция перевода i18next
 * @returns {import('swiper/types').SwiperOptions} Опции Swiper
 */
const getSwiperConfig = (t) => ({
  modules: [Autoplay, A11y],
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  speed: 800,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: t('carousel.prevSlide'),
    nextSlideMessage: t('carousel.nextSlide'),
  },
  breakpoints: {
    1049: { spaceBetween: 24 },
  },
});

/**
 * Секция отзывов клиентов: двухтоновый заголовок в стиле hero и свайпер
 * карточек-отзывов. Отзывы не привязаны к конкретному реальному человеку
 * или компании — карточки показывают тип проекта вместо имени.
 *
 * Весь текст резолвится из i18n-словаря по ключам `testimonials.*`.
 *
 * @returns {JSX.Element} Секция отзывов
 * @example
 * <Testimonials />
 */
const Testimonials = () => {
  const { t } = useTranslation();
  const headingMotion = useRevealMotion();

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <LazyMotion features={domAnimation}>
        <div className="container">
          <m.div {...headingMotion}>
            <Heading
              id="testimonials-heading"
              title={t('testimonials.title')}
              accent={t('testimonials.titleAccent')}
            />
          </m.div>
        </div>

        <Swiper
          className="testimonials__swiper"
          {...getSwiperConfig(t)}
          aria-label={t('testimonials.ariaLabel')}
          role="region"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="testimonials__slide">
              <TestimonialCard
                quote={item.quote}
                context={item.context}
                accent={item.accent}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </LazyMotion>
    </section>
  );
};

export default Testimonials;
