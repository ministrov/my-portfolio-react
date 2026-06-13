import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import Projects from '../sections/projects/Projects.jsx';
import Contact from '../sections/contact/Contact.jsx';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground.jsx';

/**
 * Компонент страницы проектов портфолио.
 * Отображает секцию со всеми проектами и контактную форму.
 * Использует React Helmet для управления мета-тегами и переводы через i18n.
 *
 * @component
 * @example
 * return (
 *   <ProjectsPage />
 * )
 */
const ProjectsPage = () => {
  const { t } = useTranslation();
  const { canonical, ruUrl, enUrl, ogLocale, ogLocaleAlt, ogImage } =
    useSeoMeta();

  // Константы для метаданных
  const PAGE_TITLE = t('metadata.projects.title');
  const PAGE_DESCRIPTION = t('metadata.projects.description');
  const PAGE_KEYWORDS = t('metadata.projects.keywords');

  // JSON-LD хлебных крошек для страницы Projects
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('breadcrumbs.home'),
        item: 'https://antoshkindev.ru',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('breadcrumbs.projects'),
        item: 'https://antoshkindev.ru/projects',
      },
    ],
  });

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
        <script type="application/ld+json">{breadcrumbSchema}</script>
      </Helmet>

      <AnimatedBackground />

      <h1 className="visually-hidden">{t('pages.projects.heading')}</h1>

      <Projects />

      <Contact />
    </>
  );
};

export default memo(ProjectsPage);
