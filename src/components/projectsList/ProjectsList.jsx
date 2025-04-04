import ProjectCard from '../projectCard/ProjectCard';
import './style.css';

const ProjectsList = ({ projects }) => {
  return (
    <ul className="projects__list">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          skills={project.skills.split(',')}
          img={project.img}
          wepImg={project.webpImg}
          imageAlt={project.title}
          custom={index}
          isProduction={project.isProduction}
        />
      ))}
    </ul>
  );
};

export default ProjectsList;
