import { useTranslation } from 'react-i18next';
import Carousel from '../../components/carousel/Carousel';
import Heading from '../../components/heading/Heading';
import './style.css';

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="testimonials">
      <div className="container">
        <Heading
          title={t('heading.testimonials.name')}
          slogan={t('heading.testimonials.subheading')}
          className="testimonials__header"
        ></Heading>

        <Carousel className="testimonials__carousel" />
      </div>
    </section>
  );
};

export default Testimonials;
