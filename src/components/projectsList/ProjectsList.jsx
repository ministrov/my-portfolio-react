import { useTranslation } from 'react-i18next';
import ProjectCard from '../projectCard/ProjectCard';
import FadeIn from '../fadeIn/FadeIn';
import './style.css';

const ProjectsList = ({ projects }) => {
  const { t } = useTranslation();

  return (
    <ul className="projects__list">
      {projects.map((project) => {
        const { id, title, overview, skills, ...rest } = project;

        return (
          <FadeIn key={id}>
            <ProjectCard
              title={t(title)}
              overview={t(overview)}
              skills={skills ? skills.split(',') : []}
              {...rest}
            />
          </FadeIn>
        )
      })}
    </ul>
  );
};

export default ProjectsList;
