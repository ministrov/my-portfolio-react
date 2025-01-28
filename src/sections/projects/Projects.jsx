import Heading from "../../components/heading/Heading";
import ProjectsList from "../../components/projectsList/ProjectsList";
import "./style.css";

const Projects = () => {
  return (
    <section className="projects">
      <div className="container">
        <Heading
          title={"Projects"}
          className="projects__title"
          slogan={
            "Unleash the power of code and create extraordinary digital experiences."
          }
        ></Heading>

        <div className="projects__filter">Filtering box</div>

        <ProjectsList />
      </div>
    </section>
  );
};

export default Projects;
