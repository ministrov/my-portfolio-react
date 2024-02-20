import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import Projects from './Projects';
import Project from './Project';

const AnimatedRoutes = () => {
  const location = useLocation();
  // console.log(location);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects title={'Projects'} />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;