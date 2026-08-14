import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import CarouselProgress from '../carouselProgress/CarouselProgress';
import useAutoplayProgress from '../../hooks/useAutoplayProgress';
import { projects } from '../../sections/projects/projects';
import './style.css';

/**
 * Карусель для отображения лучших проектов с использованием Swiper.
 * Поддерживает автоматическое пролистывание и эффект fade.
 * Навигация и пагинация отключены по умолчанию.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Array} [props.projectsData=projects] - Массив проектов для отображения
 * @param {Function} [props.filterFn=(item) => item.isBest] - Функция фильтрации проектов
 * @param {Object} [props.swiperConfig] - Конфигурация Swiper (переопределяет настройки по умолчанию)
 * @param {string} [props.ariaLabel] - ARIA-метка для доступности (по умолчанию локализованная)
 * @returns {JSX.Element} Карусель Swiper с карточками проектов
 *
 * @example
 * <Carousel />
 * <Carousel
 *   projectsData={customProjects}
 *   filterFn={(item) => item.featured}
 *   swiperConfig={{ autoplay: { delay: 5000 } }}
 * />
 */
const Carousel = ({
  projectsData = projects,
  filterFn = (item) => item.isBest,
  swiperConfig = {},
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { progressRef, handleAutoplayTimeLeft } = useAutoplayProgress();
  const filteredProjects = projectsData.filter(filterFn);

  // Конфигурация Swiper по умолчанию
  const defaultSwiperConfig = {
    modules: [Autoplay, EffectFade],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    loop: true,
    navigation: false,
    pagination: false,
    a11y: {
      enabled: true,
      prevSlideMessage: t('carousel.prevSlide'),
      nextSlideMessage: t('carousel.nextSlide'),
    },
    ...swiperConfig,
  };

  // Ручное управление автопрокруткой: единственный способ для
  // клавиатурных и тач-пользователей остановить движение (наведение
  // мышью им недоступно) — требование WCAG 2.2.2.
  const handleToggle = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (isPlaying) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setIsPlaying((prev) => !prev);
  };

  // Если проектов нет, показываем сообщение
  if (filteredProjects.length === 0) {
    return (
      <div className="carousel-empty" role="status" aria-live="polite">
        {t('carousel.emptyMessage')}
      </div>
    );
  }

  return (
    <div className="carousel">
      <Swiper
        {...defaultSwiperConfig}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onAutoplayTimeLeft={handleAutoplayTimeLeft}
        aria-label={ariaLabel || t('carousel.ariaLabel')}
        role="region"
      >
        {filteredProjects.map((project) => (
          <SwiperSlide
            key={project.id}
            role="group"
            aria-label={t('carousel.slideLabel', { project: t(project.title) })}
          >
            <ShowcasingCard
              id={project.id}
              image={project.img}
              tabletImg={project.imgTablet}
              mobileImg={project.imgMobile}
              name={project.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="carousel__toggle"
        onClick={handleToggle}
        aria-label={isPlaying ? t('carousel.pause') : t('carousel.play')}
        aria-pressed={!isPlaying}
      >
        {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
      </button>

      <CarouselProgress
        ref={progressRef}
        className="carousel-progress--on-dark"
      />
    </div>
  );
};

export default Carousel;
