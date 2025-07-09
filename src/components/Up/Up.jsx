import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaLongArrowAltUp } from 'react-icons/fa';
import './style.css';

const Up = () => {
  const [isShowed, setIsShowed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setIsShowed(false);
        break;
      case 'Enter':
        if (isShowed) scrollToTop();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsShowed(true);
      } else {
        setIsShowed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
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
          transition={{ duration: 0.65 }}
          className="scroll-to"
          onClick={scrollToTop}
          aria-label='Наверх'
        >
          <FaLongArrowAltUp size={20} color='white' />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Up;
