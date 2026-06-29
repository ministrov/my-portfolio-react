import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import Hero from '../sections/hero/Hero';
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
/** JSON-LD разметка автора — Person + WebSite schema для главной страницы. */
const PERSON_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anton Zhilin',
  jobTitle: 'Frontend Developer',
  url: 'https://antoshkindev.ru',
  email: 'ministrov2018@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Moscow',
    addressCountry: 'RU',
  },
  sameAs: ['https://github.com/ministrov', 'https://t.me/antonzhilin83'],
});

const WEBSITE_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AntoshkinDev',
  url: 'https://antoshkindev.ru',
});

const Home = () => {
  const { t } = useTranslation();
  const { canonical, ruUrl, enUrl, ogLocale, ogLocaleAlt, ogImage } =
    useSeoMeta();

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
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hreflang="ru" href={ruUrl} />
        <link rel="alternate" hreflang="en" href={enUrl} />
        <link rel="alternate" hreflang="x-default" href={ruUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{PERSON_SCHEMA}</script>
        <script type="application/ld+json">{WEBSITE_SCHEMA}</script>
      </Helmet>
      <AnimatedBackground />

      <Hero />
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
