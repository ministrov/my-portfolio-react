import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import TestimonialCard from '../../components/testimonialCard/TestimonialCard';
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
 * Базовая конфигурация анимации появления заголовка снизу вверх.
 * @type {import('framer-motion').MotionProps}
 */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

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

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <LazyMotion features={domAnimation}>
        <div className="container">
          <m.div {...fadeUp}>
            <Heading
              variant="display"
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
