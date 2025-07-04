import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();

  return (
    <ul className="projects__list">
      {projects.map((project) => {
        const { id, title, overview, skills, ...rest } = project;

        return (
          <ProjectCard
            key={project.id}
            title={t(project.title)}
            overview={t(project.overview)}
            skills={project.skills ? project.skills.split(',') : []}
            // img={project.img}
            // imageAlt={project.title}
            // isProduction={project.isProduction}
            // year={project.year}
            // role={project.role}
            // demoLink={project.demoLink}
            // gitHubLink={project.gitHubLink}
            {...rest}
          />
        )
      })}
    </ul>
  );
};

export default ProjectsList;
