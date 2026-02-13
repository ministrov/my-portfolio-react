import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
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

        <motion.div
          className="showcasing__wrapper"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ margin: '-50px' }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Suspense>
            <LazyCarousel className="showcasing__carousel" />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcasing;
