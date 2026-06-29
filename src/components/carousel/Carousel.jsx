import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import { projects } from '../../sections/projects/projects';

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

  // Если проектов нет, показываем сообщение
  if (filteredProjects.length === 0) {
    return (
      <div className="carousel-empty" role="status" aria-live="polite">
        {t('carousel.emptyMessage')}
      </div>
    );
  }

  return (
    <Swiper
      {...defaultSwiperConfig}
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
            image={project.img}
            tabletImg={project.imgTablet}
            mobileImg={project.imgMobile}
            name={project.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Carousel.propTypes = {
  /** Массив проектов для отображения */
  projectsData: PropTypes.array,
  /** Функция фильтрации проектов */
  filterFn: PropTypes.func,
  /** Конфигурация Swiper (объект с параметрами) */
  swiperConfig: PropTypes.object,
  /** ARIA-метка для доступности */
  ariaLabel: PropTypes.string,
};

export default Carousel;
