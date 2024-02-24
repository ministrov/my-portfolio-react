import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './HomePage';
import ProjectsPage from './ProjectsPage';
import ProjectPage from './ProjectPage';

const AnimatedRoutes = () => {
  const location = useLocation();
  // console.log(location);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;