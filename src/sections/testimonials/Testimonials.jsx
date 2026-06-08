import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  SiAppwrite,
  SiDocker,
  SiVercel,
  SiSupabase,
  SiFirebase,
} from 'react-icons/si';
import TestimonialCard from '../../components/testimonialCard/TestimonialCard';
import { testimonials } from './testimonials';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

/**
 * Бренды для лого-полосы «нам доверяют».
 * Точных брендов с референса (Cloudinary/Hostinger/Stream) нет в установленной
 * версии react-icons, поэтому взяты доступные узнаваемые иконки.
 * @type {Array<{ name: string, Icon: React.ComponentType }>}
 */
const BRAND_LOGOS = [
  { name: 'Appwrite', Icon: SiAppwrite },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'Firebase', Icon: SiFirebase },
];

/**
 * Конфигурация Swiper: центрированный активный слайд с подглядывающими соседями
 * на десктопе и одиночная карточка на мобильных. Сообщения навигации
 * переиспользуют существующие ключи `carousel.*`.
 * @param {(key: string) => string} t - Функция перевода i18next
 * @returns {import('swiper/types').SwiperOptions} Опции Swiper
 */
const getSwiperConfig = (t) => ({
  modules: [Autoplay, Pagination, A11y],
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: { clickable: true },
  a11y: {
    enabled: true,
    prevSlideMessage: t('carousel.prevSlide'),
    nextSlideMessage: t('carousel.nextSlide'),
  },
  breakpoints: {
    1049: { slidesPerView: 1.25, spaceBetween: 24 },
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
 * Секция отзывов клиентов: двухтоновый заголовок в стиле hero,
 * свайпер карточек-отзывов и лого-полоса технологий/партнёров.
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
      <div className="container">
        <LazyMotion features={domAnimation}>
          <m.h2
            id="testimonials-heading"
            className="testimonials__heading"
            {...fadeUp}
          >
            {t('testimonials.title')}{' '}
            <span className="testimonials__heading-accent">
              {t('testimonials.titleAccent')}
            </span>
          </m.h2>

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
                  name={item.name}
                  position={item.position}
                  initials={item.initials}
                  accent={item.accent}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <ul
            className="testimonials__logos"
            aria-label={t('testimonials.logosAriaLabel')}
          >
            {BRAND_LOGOS.map(({ name, Icon }) => (
              <li key={name} className="testimonials__logo">
                <Icon className="testimonials__logo-icon" aria-hidden="true" />
                <span className="visually-hidden">{name}</span>
              </li>
            ))}
          </ul>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Testimonials;
