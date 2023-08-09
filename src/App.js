import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/scrollToTop';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Project from './pages/Project';
import About from './pages/About';
import Modal from './components/modal/Modal';

import './styles/main.css';
import './styles/reset.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
    console.log('click');
  }

  function onClose() {
    setIsOpen(false);
    console.log('click');
  }

  return (
    <>
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects title={'Projects'}/>} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/contacts" element={<Contacts title={'Contacts'}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      <Footer />

      <Modal open={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default App;
