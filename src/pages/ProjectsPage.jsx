import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Projects from '../sections/projects/Projects.jsx';
import Contact from '../sections/contact/Contact.jsx';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground.jsx';

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
      </Helmet>

      <AnimatedBackground />

      <h1 className="visually-hidden">Страница проектров автора</h1>

      <Projects />

      <Contact />
    </>
  );
};

export default ProjectsPage;
