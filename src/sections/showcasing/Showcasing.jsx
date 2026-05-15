import { Suspense, lazy } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import Loader from '../../components/loader/Loader';
import './style.css';

const LazyCarousel = lazy(() => import('../../components/carousel/Carousel'));

/**
 * Константы анимации для компонента Showcasing
 * @constant {Object}
 */
const ANIMATION_CONFIG = {
  INITIAL: { opacity: 0, scale: 0.9, y: 30 },
  ANIMATE: { opacity: 1, scale: 1, y: 0 },
  VIEWPORT: { once: true, margin: '-50px' },
  TRANSITION: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

/**
 * Компонент секции "Портфолио" (Showcasing) - отображает карусель проектов с анимацией
 *
 * @component
 * @example
 * return (
 *   <Showcasing />
 * )
 *
 * @description
 * Этот компонент отвечает за отображение секции портфолио на главной странице.
 * Использует ленивую загрузку карусели проектов для оптимизации производительности.
 * Применяет анимации с помощью Framer Motion для плавного появления.
 *
 * @returns {JSX.Element} Секция с заголовком и каруселью проектов
 */
const Showcasing = () => {
  const { t } = useTranslation();

  return (
    <section className="showcasing">
      <div className="container">
        <Heading
          title={t('heading.showcasing.name')}
          slogan={t('heading.showcasing.subheading')}
        />
      </div>
      <LazyMotion features={domAnimation}>
        <m.div
          className="showcasing__wrapper"
          initial={ANIMATION_CONFIG.INITIAL}
          whileInView={ANIMATION_CONFIG.ANIMATE}
          viewport={ANIMATION_CONFIG.VIEWPORT}
          transition={ANIMATION_CONFIG.TRANSITION}
        >
          <Suspense fallback={<Loader />}>
            <div className="container">
              <LazyCarousel className="showcasing__carousel" />
            </div>
          </Suspense>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default Showcasing;
