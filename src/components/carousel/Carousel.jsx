import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import PropTypes from 'prop-types';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import { projects } from '../../sections/projects/projects';
import 'swiper/css';
import 'swiper/css/effect-fade';

/**
 * Карусель для отображения лучших проектов с использованием Swiper.
 * Поддерживает автоматическое пролистывание и эффекты fade.
 * Навигация и пагинация отключены по умолчанию.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Array} [props.projectsData=projects] - Массив проектов для отображения
 * @param {Function} [props.filterFn=(item) => item.isBest] - Функция фильтрации проектов
 * @param {Object} [props.swiperConfig] - Конфигурация Swiper (переопределяет настройки по умолчанию)
 * @param {boolean} [props.showNavigation=false] - Показывать кнопки навигации (вперёд/назад)
 * @param {boolean} [props.showPagination=false] - Показывать пагинацию (точки)
 * @param {string} [props.ariaLabel='Карусель лучших проектов'] - ARIA-метка для доступности
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
  showNavigation = false,
  showPagination = false,
  ariaLabel = 'Карусель лучших проектов',
}) => {
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
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
    ...swiperConfig,
  };

  // Если проектов нет, показываем сообщение
  if (filteredProjects.length === 0) {
    return (
      <div className="carousel-empty" role="status" aria-live="polite">
        Нет проектов для отображения
      </div>
    );
  }

  return (
    <Swiper {...defaultSwiperConfig} aria-label={ariaLabel} role="region">
      {filteredProjects.map((project) => (
        <SwiperSlide
          key={project.id}
          role="group"
          aria-label={`Слайд: ${project.title}`}
        >
          <ShowcasingCard
            image={project.img}
            tabletImg={project.imgTablet}
            mobileImg={project.imgMobile}
            name={project.title}
            aria-hidden="false"
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
  /** Показывать кнопки навигации */
  showNavigation: PropTypes.bool,
  /** Показывать пагинацию */
  showPagination: PropTypes.bool,
  /** ARIA-метка для доступности */
  ariaLabel: PropTypes.string,
};

export default Carousel;
