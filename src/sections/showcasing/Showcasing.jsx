import { Suspense, lazy } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import Loader from '../../components/loader/Loader';
import './style.css';

const LazyCarousel = lazy(() => import('../../components/carousel/Carousel'));

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
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }} // ✅ once: true - анимация только 1 раз
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
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
