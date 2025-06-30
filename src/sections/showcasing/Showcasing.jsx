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
          title={t('heading.advertisement.name')}
          slogan={t('heading.advertisement.subheading')}
        />

        <div className="showcasing__wrapper">
          <Carousel className="testimonials__carousel" />
        </div>
      </div>
    </section>
  );
};

export default Showcasing;
