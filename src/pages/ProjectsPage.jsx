import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Projects from '../sections/projects/Projects.jsx';

const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('metadata.projects.title')}</title>
        <meta
          name="description"
          content={t('metadata.projects.description')}
          data-rh="true"
        />
        {/* <link rel="canonical" href={`${window.location.origin}/`} /> */}
      </Helmet>

      <h1 className="visually-hidden">Page about author's projects</h1>

      <Projects />
    </>
  );
};

export default ProjectsPage;
