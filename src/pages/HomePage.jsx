import { useTranslation } from 'react-i18next';
import { memo, lazy, Suspense } from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import Hero from '../sections/hero/Hero';
import About from '../sections/about/About';
import Faq from '../sections/faq/Faq';
import Services from '../sections/services/Services.jsx';
import Contact from '../sections/contact/Contact.jsx';
import Advantages from '../sections/advantages/Advantages.jsx';
import Loader from '../components/loader/Loader';

const Showcasing = lazy(() => import('../sections/showcasing/Showcasing.jsx'));
const Testimonials = lazy(
  () => import('../sections/testimonials/Testimonials.jsx')
);

/**
 * Компонент главной страницы портфолио.
 * Отображает все основные секции: промо-блок, о себе, проекты, услуги, преимущества, FAQ и контакты.
 * Мета-теги объявляются нативно — React 19 сам поднимает <title>, <meta> и <link> в <head>.
 *
 * JSON-LD автора (Person + WebSite) живёт статикой в index.html: схемы не зависят
 * ни от языка, ни от маршрута, а инлайновые <script> React в <head> не поднимает.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
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
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta name="keywords" content={PAGE_KEYWORDS} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ru" href={ruUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={ruUrl} />
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

      <Hero />
      <About link />
      <Suspense fallback={<Loader />}>
        <Showcasing />
      </Suspense>
      <Services />
      <Advantages />
      <Suspense fallback={<Loader />}>
        <Testimonials />
      </Suspense>
      <Faq />
      <Contact />
    </>
  );
};

export default memo(Home);
