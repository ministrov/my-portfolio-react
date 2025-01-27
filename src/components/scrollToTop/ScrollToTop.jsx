import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { FaLongArrowAltUp } from "react-icons/fa";
import './style.css';

const ScrollToTop = () => {
  const [isShowed, setIsShowed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsShowed(true);
      } else {
        setIsShowed(false);
      }
    }

    scrollToTop(); 

    document.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isShowed && (
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="scroll-to"
          onClick={scrollToTop}
        >
          <FaLongArrowAltUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop;