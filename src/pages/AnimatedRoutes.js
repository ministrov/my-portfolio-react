import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Contacts from './Contacts';
import Home from './Home';
import Projects from './Projects';
import Project from './Project';

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects title={'Projects'} />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/contacts" element={<Contacts title={'Contacts'} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;