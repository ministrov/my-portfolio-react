import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
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

  // Константы для метаданных
  const PAGE_TITLE = t('metadata.projects.title');
  const PAGE_DESCRIPTION = t('metadata.projects.description');
  const PAGE_KEYWORDS = t('metadata.projects.keywords');

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} data-rh="true" />
        <meta name="keywords" content={PAGE_KEYWORDS} />
      </Helmet>

      <AnimatedBackground />

      <h1 className="visually-hidden">Страница проектов автора</h1>

      <Projects />

      <Contact />
    </>
  );
};

export default memo(ProjectsPage);
