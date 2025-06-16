// import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Projects from '../sections/projects/Projects.jsx';
// import ProjectModal from '../components/projectModal/ProjectModal.jsx';

const ProjectsPage = () => {
  // const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();

  // const handleProjectClick = (projectId) => {
  //   const project = projects.find(p => p.id === projectId);
  //   setSelectedProject(project);
  // };

  // const handleCloseModal = () => {
  //   setSelectedProject(null);
  // };

  return (
    <>
      <Helmet>
        <title>{t('metadata.projects.title')}</title>
        <meta
          name="description"
          content={t('metadata.projects.description')}
          data-rh="true"
        />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <section className="projects-page">
        <h1 className="visually-hidden">Page about author's projects</h1>

        <Projects />
      </section>

      {/* Ленивая загрузка модалки
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </Suspense> */}
    </>
  );
};

export default ProjectsPage;
