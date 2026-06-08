import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Hero from '../sections/hero/Hero';
// import Promo from '../sections/promo/Promo';
import About from '../sections/about/About';
import Showcasing from '../sections/showcasing/Showcasing.jsx';
import Faq from '../sections/faq/Faq';
import Services from '../sections/services/Services.jsx';
import Contact from '../sections/contact/Contact.jsx';
import Advantages from '../sections/advantages/Advantages.jsx';
import Testimonials from '../sections/testimonials/Testimonials.jsx';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground.jsx';

/**
 * Компонент главной страницы портфолио.
 * Отображает все основные секции: промо-блок, о себе, проекты, услуги, преимущества, FAQ и контакты.
 * Использует React Helmet для управления мета-тегами и переводы через i18n.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
const Home = () => {
  const { t } = useTranslation();

  // Константы для метаданных
  const PAGE_TITLE = t('metadata.home.title');
  const PAGE_DESCRIPTION = t('metadata.home.description');
  const PAGE_KEYWORDS = t('metadata.home.keywords');

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} data-rh="true" />
        <meta name="keywords" content={PAGE_KEYWORDS} />
      </Helmet>
      <AnimatedBackground />

      <h1 className="visually-hidden">Главная страница</h1>
      <Hero />
      {/* <Promo /> */}
      <About link />
      <Showcasing />
      <Services />
      <Advantages />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
};

export default memo(Home);
