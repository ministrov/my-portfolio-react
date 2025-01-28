import { motion } from "framer-motion";
import Projects from "../sections/projects/Projects";
import ScrollToTop from '../components/scrollToTop/ScrollToTop';

const ProjectsPage = () => {
  return (
    <motion.main
      className='projects-page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="visually-hidden">Page about author's projects</h1>

      <Projects />

      <ScrollToTop/>
    </motion.main>
  );
};

export default ProjectsPage;
