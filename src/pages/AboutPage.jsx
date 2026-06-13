import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSeoMeta } from '../hooks/useSeoMeta';
import About from '../sections/about/About';
import AboutCapabilities from '../components/aboutCapabilities/AboutCapabilities';
import AboutExperience from '../components/aboutExperience/AboutExperience';
import AboutEducation from '../components/aboutEducation/AboutEducation';
import AuthorPhoto from '../components/authorPhoto/AuthorPhoto';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Contact from '../sections/contact/Contact';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';

/**
 * Страница "Обо мне" - отображает информацию об авторе, опыт, образование и контактную форму.
 *
 * @component
 * @example
 * return (
 *   <AboutPage />
 * )
 *
 * @returns {JSX.Element} Компонент страницы "Обо мне"
 */
const AboutPage = () => {
  const { t } = useTranslation();
  const { canonical, ruUrl, enUrl } = useSeoMeta();

  // Константы для метаданных
  const PAGE_TITLE = t('metadata.about.title');
  const PAGE_DESCRIPTION = t('metadata.about.description');
  const PAGE_KEYWORDS = t('metadata.about.keywords');

  // Хлебные крошки с мемоизацией для оптимизации
  const BREADCRUMBS = useMemo(
    () => [
      { id: 1, name: t('breadcrumbs.home'), link: '/' },
      { id: 2, name: t('breadcrumbs.about') },
    ],
    [t]
  );

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
      </Helmet>

      <AnimatedBackground />

      {/* Скрытый заголовок для доступности */}
      <h1 className="visually-hidden">{t('pages.about.title')}</h1>

      <div className="container">
        <Breadcrumbs items={BREADCRUMBS} />
      </div>

      <About />

      <div className="container wrapper">
        <AuthorPhoto />
      </div>

      <AboutCapabilities />

      <AboutExperience />

      <AboutEducation />

      <Contact />
    </>
  );
};

export default AboutPage;
