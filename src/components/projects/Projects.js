import Heading from '../heading/Heading';
import ProjectsList from '../projectsList/ProjectsList';
import './style.css';

const Projects = () => {
  return (
    <>
      <h1 className="visually-hidden">Page about author's projects</h1>
      
      <section className="projects">
        <div className="container">
          <Heading title={"Projects"} className="projects__title" slogan={"Unleash the power of code and create extraordinary digital experiences."}></Heading>
          
          <ProjectsList/>
        </div>
      </section>
    </>
  )
}

export default Projects;