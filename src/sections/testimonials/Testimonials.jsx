import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import TestimonialCard from '../../components/testimonialCard/TestimonialCard';
import CarouselProgress from '../../components/carouselProgress/CarouselProgress';
import useAutoplayProgress from '../../hooks/useAutoplayProgress';
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [swiper, setSwiper] = useState(null);
  const { progressRef, handleAutoplayTimeLeft } = useAutoplayProgress();

  // Автопрокрутка отзывов ничего не сообщает, пока секции нет на экране,
  // но продолжает перелистывать слайды и держать таймер. Останавливаем её
  // за кадром и возвращаем, когда секция снова видна
  useEffect(() => {
    if (!swiper?.autoplay) return;

    if (isInView) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [swiper, isInView]);

  return (
    <section
      ref={sectionRef}
      className="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <Heading
          id="testimonials-heading"
          title={t('testimonials.title')}
          accent={t('testimonials.titleAccent')}
        />
      </div>

      <div className="testimonials__player">
        <Swiper
          className="testimonials__swiper"
          {...getSwiperConfig(t)}
          onSwiper={setSwiper}
          onAutoplayTimeLeft={handleAutoplayTimeLeft}
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

        <CarouselProgress ref={progressRef} />
      </div>
    </section>
  );
};

export default Testimonials;
