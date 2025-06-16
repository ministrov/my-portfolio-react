import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects, onImageClick }) => {
  const { t } = useTranslation();

  return (
    <ul className="projects__list">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={t(project.title)}
          skills={project.skills.split(',')}
          img={project.img}
          wepImg={project.webpImg}
          imageAlt={project.title}
          custom={index}
          isProduction={project.isProduction}
          onImageClick={project.id}
        />
      ))}
    </ul>
  );
};

export default ProjectsList;
