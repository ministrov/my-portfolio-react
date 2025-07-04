import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();

  return (
    <ul className="projects__list">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={t(project.title)}
          overview={(t(project.overview))}
          skills={project.skills.split(',')}
          img={project.img}
          imageAlt={project.title}
          isProduction={project.isProduction}
          year={project.year}
          role={project.role}
          custom={index}
          demoLink={project.demoLink}
          gitHubLink={project.gitHubLink}
        />
      ))}
    </ul>
  );
};

export default ProjectsList;
