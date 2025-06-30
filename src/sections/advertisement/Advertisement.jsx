import { useTranslation } from 'react-i18next';
import Carousel from '../../components/carousel/Carousel';
import Heading from '../../components/heading/Heading';
import './style.css';

const Advertisement = () => {
  const { t } = useTranslation();

  return (
    <section className="advertisement">
      <div className="container">
        <Heading
          title={t('heading.advertisement.name')}
          slogan={t('heading.advertisement.subheading')}
        />

        <div className="advertisement__advs">
          <Carousel className="testimonials__carousel" />
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
