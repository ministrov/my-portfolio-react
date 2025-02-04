import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Projects from "../sections/projects/Projects";
import ScrollUp from "../components/scrollUp/scrollUp";

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Page of the all projects</title>
      </Helmet>

      <motion.div
        className='projects-page'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="visually-hidden">Page about author's projects</h1>

        <Projects />

        <ScrollUp/>
      </motion.div>
    </>
  );
};

export default ProjectsPage;
