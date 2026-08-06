import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import Loader from '../../components/loader/Loader';
import './style.css';

const LazyCarousel = lazy(() => import('../../components/carousel/Carousel'));

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
    <section className="showcasing" aria-labelledby="showcasing-heading">
      <div className="container">
        <Heading
          id="showcasing-heading"
          title={t('heading.showcasing.name')}
          accent={t('heading.showcasing.accent')}
        />
      </div>
      <div className="showcasing__wrapper">
        <Suspense fallback={<Loader />}>
          <div className="container">
            <LazyCarousel />
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default Showcasing;
