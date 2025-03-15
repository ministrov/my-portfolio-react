import { Helmet } from "react-helmet-async";
import Projects from "../sections/projects/Projects";
import ScrollUp from "../components/scrollUp/scrollUp";

const ProjectsPage = () => {
  return (
    <section className="projects-page">
      <h1 className="visually-hidden">Page about author's projects</h1>
      <Helmet>
        <title>Page of the all projects</title>
        <meta
          name="description"
          content="A stunning list of the incredible projects of the frontend developer that call Anton Zhilin"
          data-rh="true"
        />
        <link rel="canonical" href="/products" />  
      </Helmet>

      <Projects />

      <ScrollUp/>
    </section>
  );
};

export default ProjectsPage;
