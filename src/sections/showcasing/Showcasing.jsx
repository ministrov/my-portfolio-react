import { Suspense, lazy } from 'react';
import { LazyMotion, m, domAnimation } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import Loader from '../../components/loader/Loader';
import useRevealMotion from '../../hooks/useRevealMotion';
import './style.css';

const LazyCarousel = lazy(() => import('../../components/carousel/Carousel'));

/**
 * Стартовое состояние секции: только короткий подъём.
 * Масштаб (прежний scale: 0.9) убран намеренно — он приводил карточки
 * проектов в кадр интерполированными и потому нерезкими, а это
 * единственная секция, где работы должны читаться сразу.
 */
const SHOWCASING_FROM = { opacity: 0, y: 24 };

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
  const reveal = useRevealMotion({ from: SHOWCASING_FROM, duration: 0.55 });

  return (
    <section className="showcasing" aria-labelledby="showcasing-heading">
      <div className="container">
        <Heading
          id="showcasing-heading"
          title={t('heading.showcasing.name')}
          accent={t('heading.showcasing.accent')}
        />
      </div>
      <LazyMotion features={domAnimation}>
        <m.div className="showcasing__wrapper" {...reveal}>
          <Suspense fallback={<Loader />}>
            <div className="container">
              <LazyCarousel />
            </div>
          </Suspense>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default Showcasing;
