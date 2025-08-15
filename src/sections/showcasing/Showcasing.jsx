import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Carousel from '../../components/carousel/Carousel';
import Heading from '../../components/heading/Heading';
import './style.css';

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
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <Carousel className="showcasing__carousel" />
        </motion.div>
      </div>
    </section>
  );
};

export default Showcasing;
