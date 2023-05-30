// import Project from '../components/project/Project';
import { projects } from '../helpers/projectsList';
import Project from '../components/project/Project';
import Burger from '../components/burger/Burger';

const Projects = () => {
  return (
    <>
      <main className="section">
        <div className="container">
          <h2 className="title-1">Projects</h2>
          <ul className="projects">
            {projects.map(project => <Project title={project.title} img={project.img} key={project.id}/>)}
          </ul>

          <Burger/>
        </div>
      </main>
    </>
  )
}

export default Projects;
