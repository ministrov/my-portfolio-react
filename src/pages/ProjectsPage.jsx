import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
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

      <motion.div
        className='projects-page'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Projects />

        <ScrollUp/>
      </motion.div>
    </section>
  );
};

export default ProjectsPage;
