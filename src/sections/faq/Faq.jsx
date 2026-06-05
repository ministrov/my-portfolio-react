import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Accordion from '../../components/accordion/Accordion';
import Heading from '../../components/heading/Heading';
import './style.css';

/**
 * Секция "Часто задаваемые вопросы" (FAQ).
 * Отображает заголовок и аккордеон с вопросами и ответами.
 * Использует интернационализацию для заголовков.
 *
 * @component
 * @example
 * return (
 *   <Faq />
 * )
 *
 * @returns {JSX.Element} Секция FAQ
 */
const Faq = () => {
  const { t } = useTranslation();

  return (
    <section className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <Heading
          id="faq-heading"
          title={t('heading.faq.name')}
          slogan={t('heading.faq.subheading')}
        />

        <Accordion />
      </div>
    </section>
  );
};

export default memo(Faq);
