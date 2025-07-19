import { useTranslation } from 'react-i18next';
import Accordion from '../../components/accordion/Accordion';
import Heading from '../../components/heading/Heading';
import './style.css';

const Faq = () => {
  const { t } = useTranslation();

  return (
    <section className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <Heading
          title={t('heading.faq.name')}
          slogan={t('heading.faq.subheading')}
          className="heading-sec__main--second"
        />

        <Accordion />
      </div>
    </section>
  );
};

export default Faq;
