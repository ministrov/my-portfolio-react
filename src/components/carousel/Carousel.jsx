import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import PropTypes from 'prop-types';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import { projects } from '../../sections/projects/projects';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Карусель для отображения лучших проектов с использованием Swiper.
 * Поддерживает автоматическое пролистывание, навигацию, пагинацию и эффекты.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Array} [props.projectsData=projects] - Массив проектов для отображения
 * @param {Function} [props.filterFn=(item) => item.isBest] - Функция фильтрации проектов
 * @param {Object} [props.swiperConfig] - Конфигурация Swiper (переопределяет настройки по умолчанию)
 * @param {boolean} [props.showNavigation=true] - Показывать кнопки навигации (вперёд/назад)
 * @param {boolean} [props.showPagination=true] - Показывать пагинацию (точки)
 * @param {string} [props.ariaLabel='Карусель лучших проектов'] - ARIA-метка для доступности
 * @returns {JSX.Element} Карусель Swiper с карточками проектов
 *
 * @example
 * <Carousel />
 * <Carousel
 *   projectsData={customProjects}
 *   filterFn={(item) => item.featured}
 *   showNavigation={false}
 *   swiperConfig={{ autoplay: { delay: 5000 } }}
 * />
 */
const Carousel = ({
  projectsData = projects,
  filterFn = (item) => item.isBest,
  swiperConfig = {},
  showNavigation = true,
  showPagination = true,
  ariaLabel = 'Карусель лучших проектов',
}) => {
  const filteredProjects = projectsData.filter(filterFn);

  // Конфигурация Swiper по умолчанию
  const defaultSwiperConfig = {
    modules: [Autoplay, EffectFade, ...(showNavigation ? [Navigation] : []), ...(showPagination ? [Pagination] : [])],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    loop: true,
    navigation: showNavigation,
    pagination: showPagination ? { clickable: true } : false,
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
    <Swiper
      {...defaultSwiperConfig}
      aria-label={ariaLabel}
      role="region"
    >
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
