import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Page404 from './Page404';
import HomePage from './HomePage';
import ProjectsPage from './ProjectsPage';
import ProjectPage from './ProjectPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;