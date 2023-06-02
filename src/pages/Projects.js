// import Project from '../components/project/Project';
import Project from '../components/project/Project';
import { projects } from '../helpers/projectsList';

const Projects = () => {
  return (
    <>
      <main className="section">
        <h1 className="visually-hidden">Page about author's projects</h1>
        <div className="container">
          <h2 className="title-1">Projects</h2>
          <ul className="projects">
            {projects.map((project, index) =>
              <Project
                title={project.title}
                img={project.img}
                key={project.id}
                index={index}
              />)}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Projects;
