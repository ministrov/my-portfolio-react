import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Promo from '../components/promo/Promo';
import About from '../components/about/About';
import Modal from '../components/modal/Modal';
import Contact from '../components/contacts/Contacts';
import Skills from '../components/skills/Skills';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseHandler = (event) => {
    const target = event.target;

    if (target) setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen])

  return (
    <>
      <motion.main
        className="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="visually-hidden">Home page of the author</h1>

        <Promo setIsOpen={setIsOpen}/>

        <About/>

        <Skills/>

        <Contact />
      </motion.main>

      <Modal open={isOpen} onClose={onCloseHandler}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque alias maiores non deleniti nemo iure, ex accusantium harum perspiciatis reiciendis ipsam earum at, repellendus facere nisi quia asperiores minima fugit rerum illum perferendis!
        </p>

        <p>
          Quia aut, repellendus, qui pariatur voluptate ut in corporis, culpa eveniet deleniti eaque dolor cum repudiandae nostrum!
        </p>
      </Modal>
    </>
  )
}

export default Home;