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
          <li
            className="project-card__item"
            tabIndex={0}
          >
            <ProjectCard
              key={id}
              title={t(title)}
              overview={t(overview)}
              skills={skills ? skills.split(',') : []}
              {...rest}
            />
          </li>
        )
      })}
    </ul>
  );
};

export default ProjectsList;
