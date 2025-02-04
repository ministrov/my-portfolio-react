import { motion } from "framer-motion";
import Projects from "../sections/projects/Projects";
import ScrollUp from "../components/scrollUp/scrollUp";
import { Helmet } from 'react-helmet';

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Page of the all projects</title>
        <meta name="description" content="This is my awesome React app description." />
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
