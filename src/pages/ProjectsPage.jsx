import { useState, useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Projects from '../sections/projects/Projects.jsx';
import ProjectModal from '../components/projectModal/ProjectModal.jsx';
import { projects } from '../sections/projects/projects.js';

const clonedProjects = projects;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([...clonedProjects]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();

  console.log(projects);

  useEffect(() => {
    try {
      // Здесь должна быть реальная загрузка данных
      // Например: const response = await api.get('/projects');
      setProjects();
    } catch (err) {
      // setError(t('projectsPage.loadError'));
    } finally {
      // setIsLoading(false);
    }
  }, []);

  const handleProjectClick = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

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

        <Projects onImageClick={handleProjectClick}/>
      </section>

      {/* Модалка с Suspense для ленивой загрузки */}
      <Suspense fallback={<div className="modal-loading">Loading...</div>}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </Suspense>
    </>
  );
};

export default ProjectsPage;
