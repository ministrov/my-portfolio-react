import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import Projects from '../sections/projects/Projects.jsx';
import Contact from '../sections/contact/Contact.jsx';
import { projects } from '../sections/projects/projects.js';

/**
 * Компонент страницы проектов портфолио.
 * Отображает секцию со всеми проектами и контактную форму.
 * Мета-теги объявляются нативно — React 19 сам поднимает их в <head>. Переводы через i18n.
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

  // JSON-LD по каждому кейсу: помогает поисковым сниппетам и AI-выдаче
  // (GEO) сопоставлять проект с автором и стеком без парсинга вёрстки.
  const projectsSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: t(project.title),
        description: t(project.overview),
        url: project.demoLink,
        dateCreated: project.year,
        keywords: project.skills,
        author: {
          '@type': 'Person',
          name: 'Anton Zhilin',
          url: 'https://antoshkindev.ru',
        },
      },
    })),
  });

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

      {/* Зависит от языка, поэтому остаётся в компоненте и рендерится в <body>. См. AboutPage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: projectsSchema }}
      />

      <h1 className="visually-hidden">{t('pages.projects.heading')}</h1>

      <Projects />

      <Contact />
    </>
  );
};

export default memo(ProjectsPage);
